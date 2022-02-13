import { collection, query, getDocs, Timestamp, where, DocumentData, QueryDocumentSnapshot, addDoc, doc, runTransaction, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "./firebase";
import { AppUser, getAppUserByID } from "./users_db";

const BLOG_COLLECTION = "BlogReferences";
const BLOGS_COLL_REF = collection(db, BLOG_COLLECTION);
const BLOG_COMMENT_COLLECTION = "BlogComments";
const VOTE_MAP_FIELD_NAME = "voteMap";      // any field names used as keys in multiple places get named constants
const VOTE_TOTAL_FIELD_NAME = "voteTotal";

export enum BlogStatus {
    draft = 0,
    published = 1
}

// Data model for a a blog reference - expect it to expand in scope as more features are developed
export interface IBlogReference {
    ID: string;
    author: string;
    category: string; 
    excerpt: string;
    featuredImage: string; // reference to blob. Can we use storagereference datatype?
    lastUpdate: Timestamp;
    postDate: Timestamp;
    status: BlogStatus,
    tags: string[];
    title: string;
    storagePath: string;
}

// Load all blog reference documents from the Firebase datastore
// Used primarily to show a selection of all avaiable blogs to users.
export async function loadAllBlogReferences() {
    let docs: IBlogReference[] = [];

    try {
        // A "QuerySnapshot" is Firebase's term for a query result
        const querySnapshot = await getDocs(BLOGS_COLL_REF);
        
        querySnapshot.forEach((doc) => {
            let blogRef = {
                ...doc.data(),
                ID: doc.id
            };
            docs.push(blogRef as IBlogReference);
        }); 
        
    }
    catch (e: any) {
        throw new Error(e);
    }

    return docs;
}

const sortBlogReferencesByDate = (a: IBlogReference, b: IBlogReference) => {
    return(a.postDate.seconds - b.postDate.seconds);
}

interface IContentSetCallback {
    (content: string): void;
}

// Load the content for a single blog entry. Pass in callback for setting content. 
// Content is set in the form of a string. Use ReactHtmlParser before using content.
export async function loadBlogContent(blogPath: string, contentSetCallback: IContentSetCallback) {
    
    // Use blog path to get URL to content, then make an HTTP request to load content.
    // Content is in form of a markdown file with references to images on the blob that will get resolved automatically by the browser.     
    const url = await getDownloadURL(ref(storage, blogPath))
            
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    
    xhr.onload = (event) => {
        const response = xhr.response;
        response.text().then((text: string) => contentSetCallback(text));
    };
    xhr.open('GET', url);
    
    try {
        xhr.send();   
    }
    catch(reason) {
        console.log("Blog load failed: " + reason)
    }    
    finally {
        contentSetCallback(""); // set null string as content. Make this better later
    };
}

export async function getBlogFromTitle(title: string) {
    const queryString = query(BLOGS_COLL_REF, where("title","==",title));
    let blogRef = {}

    // This should only ever return one document. Firebase doesn't support uniqueness constraints
    // but we'll enforce it during publishing of a blog.
    try {
        const querySnapshot = await getDocs(queryString);
        blogRef = {
            ...querySnapshot.docs[0].data(),
            ID: querySnapshot.docs[0].id
        }
    }
    catch (e: any) {
        throw new Error(e);
    }

    return (blogRef as IBlogReference);
}

export function createNewBlog(blogRef: IBlogReference) {
    const blogDoc = doc(BLOGS_COLL_REF);
    setDoc(blogDoc, blogRef);
    
    return blogDoc.id;
}

export function saveBlogDraft(blogRef: IBlogReference, blogContent: string, rawText: string) {
    
    // Update the blog reference
    const blogPath = BLOG_COLLECTION + "/" + blogRef.ID
    const blogDoc = doc(db, blogPath);
    setDoc(blogDoc, blogRef);

    // Save the HTML content
    const htmlFilePath = blogRef.storagePath + "/content.md.html";
    const htmlStorageRef = ref(storage, htmlFilePath);
    uploadString(htmlStorageRef, blogContent);

    // Save the raw text
    const rawTextFilePath = blogRef.storagePath + "/rawText.txt";
    const rawTextStorageRef = ref(storage, rawTextFilePath);
    uploadString(rawTextStorageRef, rawText);
}

export function publishBlog(blogRef: IBlogReference, htmlContent: string, rawText: string) {
    blogRef.status = BlogStatus.published;
    blogRef.postDate = Timestamp.now();
    saveBlogDraft(blogRef, htmlContent, rawText);
}

// ======================= EVERYTHING BELOW IS FOR BLOG COMMENTS ================ //

export enum VoteType {
    Up = 1,
    Down = -1,
    None = 0
}

export class BlogComment {
    ID: string = "";
    text: string = "";
    edited: boolean = false;
    childComments: BlogComment[] = [];    // comments are doubly-linked for ease of traversal / construction  (via parent IDs)
    parentCommentID: string;              // and ease of rendering (via children comments). Only parentID is stored in database. Child comments constructed dynamically.
    postDate: Timestamp = Timestamp.now();
    userVote: VoteType;                   // The active user's vote on this comment
    voteTotal: number;                    // updated offline via cloud functions (triggered by vote actions), to prevent traversing the votes map.
    userId: string = "";
    userName: string = "";
    userPhotoUrl: string = "";

    // Construct from database object
    constructor(blogCommentObj: QueryDocumentSnapshot<DocumentData>, activeUser: AppUser | undefined) {
        this.ID = blogCommentObj.id;
        this.text = blogCommentObj.get("text");
        this.edited = blogCommentObj.get("edited");
        this.parentCommentID = blogCommentObj.get("parentCommentID");
        this.postDate = blogCommentObj.get("postDate");
        this.userVote = activeUser ? (blogCommentObj.get(VOTE_MAP_FIELD_NAME)[activeUser.userId] || VoteType.None) : VoteType.None;
        this.voteTotal = blogCommentObj.get(VOTE_TOTAL_FIELD_NAME);

        getAppUserByID(blogCommentObj.get("userID")).then((userSnapshot) => {
            this.userId = userSnapshot.get("userId");
            this.userName = userSnapshot.get("name");
            this.userPhotoUrl = userSnapshot.get("photoUrl");
        });
    }

    // Return a new comment in object format for posting to firebase. (This is basically another constructor. Typescript prohibits multiple constructor
    // implemntations so this is a hack of sorts.)
    static Object(text: string, parentCommentID: string, userID: string) {
        return(
            {
                edited: false,
                parentCommentID: parentCommentID,
                postDate: Timestamp.now(),
                text: text,
                userID: userID,
                voteMap: {},
                voteTotal: 0,
                // All other properties of class are computed dynamically
            }
        )
    }
}

export interface ISetBlogComments {
    (comments: BlogComment[]): void;
}

export function loadCommentsForBlog(blogRef: IBlogReference, setBlogComments: ISetBlogComments, activeUser: AppUser | undefined) {
    const commentsCollectionPath = BLOG_COLLECTION + "/" + blogRef.ID  + "/" + BLOG_COMMENT_COLLECTION;
    const commentsCollectionRef = collection(db, commentsCollectionPath); 
    
    getDocs(commentsCollectionRef).then((querySnapshot) => {
        // Initialize with root-level comments
        const rootComments = querySnapshot.docs.filter((doc) => doc.get("parentCommentID") === "-1").sort(sortCommentsByDate);
        const nonRootComments = querySnapshot.docs.filter((doc) => doc.get("parentCommentID") !== "-1");

        const linkedComments = linkUpBlogComments(rootComments, nonRootComments, activeUser);
        setBlogComments(linkedComments);
    });
    
}

// Recursive helper function to link together blog comments via parent-child relationships
function linkUpBlogComments(currComments: QueryDocumentSnapshot<DocumentData>[], otherComments: QueryDocumentSnapshot<DocumentData>[], activeUser: AppUser | undefined) {
    let comments: BlogComment[] = [];

    currComments.forEach((parentComment) => {
        const blogComment = new BlogComment(parentComment, activeUser);

        const childrenDocs = otherComments.filter((doc) => doc.get("parentCommentID") === parentComment.id).sort(sortCommentsByDate);
        const nonChildrenDocs = otherComments.filter((doc) => doc.get("parentCommentID") !== parentComment.id);

        const childrenComments = linkUpBlogComments(childrenDocs, nonChildrenDocs, activeUser);
        childrenComments.forEach((child) => blogComment.childComments.push(child));

        comments.push(blogComment);
    })

    return comments;
}

const sortCommentsByDate = (a: QueryDocumentSnapshot<DocumentData>, b: QueryDocumentSnapshot<DocumentData>) => {
    return ((a.get("postDate") as Timestamp).seconds - (b.get("postDate") as Timestamp).seconds);
}

export function postBlogComment(blogID: string, text: string, parentCommentID: string, userID: string) {

    const firebaseComment = BlogComment.Object(text, parentCommentID, userID);  // firebase only accepts data in plain object format
    const commentsCollectionPath = BLOG_COLLECTION + "/" + blogID + "/" + BLOG_COMMENT_COLLECTION + "/";
    const commentsCollectionRef = collection(db, commentsCollectionPath);

    addDoc(commentsCollectionRef,firebaseComment);
}

export function editBlogComment(commentID: string, newText: string, blogID: string) {
    const commentsCollectionPath = BLOG_COLLECTION + "/" + blogID + "/" + BLOG_COMMENT_COLLECTION + "/";
    const commentsCollectionRef = collection(db, commentsCollectionPath);
    const commentDocRef = doc(commentsCollectionRef, commentID);

    updateDoc(commentDocRef, {text: newText, edited: true})
}

export function voteOnBlogComment(voteType: VoteType, voteChange: number, blogID: string, commentID: string, userID: string) {

    const commentPath = BLOG_COLLECTION + "/" + blogID + "/" + BLOG_COMMENT_COLLECTION + "/" + commentID;
    const commentDocRef = doc(db, commentPath);

    try {
        runTransaction(db, async (transaction) => {
            
            const commentDoc = await transaction.get(commentDocRef);
            if (!commentDoc.exists()) throw new Error("Voted comment does not exist");

            const prevVoteTotal: number = commentDoc.data().voteTotal;
            let data: any = {};
            data[VOTE_MAP_FIELD_NAME + "." + userID] = voteType;
            data[VOTE_TOTAL_FIELD_NAME] = (prevVoteTotal + voteChange);

            transaction.update(commentDocRef, data);
        });
    }

    catch(e) {
        console.log("Transaction failed: ", e);
    }
}