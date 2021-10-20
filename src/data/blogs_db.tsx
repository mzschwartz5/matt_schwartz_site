import { collection, query, getDocs, Timestamp, where, DocumentData, QueryDocumentSnapshot, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase";
import { getAppUserByID } from "./users_db";

const BLOG_COLLECTION = "BlogReferences";
const BLOGS_COLL_REF = collection(db, BLOG_COLLECTION);

// Data model for a a blog reference - expect it to expand in scope as more features are developed
export interface IBlogReference {
    ID: string;
    author: string;
    category: string; // eventually turn into enum
    excerpt: string;
    featuredImage: string; // reference to blob. Can we use storagereference datatype?
    lastUpdate: Timestamp;
    postDate: Timestamp;
    status: number; // eventually turn into enum
    tags: string[];
    title: string;
    storagePath: string;
}

interface IBlogRefSetCallback {
     (refs: IBlogReference[]): void;
}

// Load all blog reference documents from the Firebase datastore
// Used primarily to show a selection of all avaiable blogs to users.
export function loadAllBlogReferences(refSetCallback: IBlogRefSetCallback) {

    try {
        let docs: IBlogReference[] = [];

        // A "QuerySnapshot" is Firebase's term for a query result
        getDocs(BLOGS_COLL_REF).then((querySnapshot) => {

            querySnapshot.forEach((doc) => docs.push(doc.data() as IBlogReference)); // is this type assertion dangerous?

            refSetCallback(docs);
        });
    }
    catch (e: any) {
        throw new Error(e);
    }
}

interface IContentSetCallback {
    (content: string): void;
}

// Load the content for a single blog entry. Pass in callback for setting content. 
// Content is set in the form of a string. Use ReactHtmlParser before using content.
export function loadBlogContent(blogPath: string, contentSetCallback: IContentSetCallback) {
    
    // Use blog path to get URL to content, then make an HTTP request to load content.
    // Content is in form of a markdown file with references to images on the blob that will get resolved automatically.
    try {        
        getDownloadURL(ref(storage, blogPath))
        .then((url) => {

            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            
            xhr.onload = (event) => {
                const response = xhr.response;
                response.text().then((text: string) => contentSetCallback(text));
            };
            xhr.open('GET', url);

            xhr.send();
        });
    }
    catch (e: any) {
        throw new Error(e);
    }
}

interface IBlogSetCallback {
    (blogRef: IBlogReference): void;
}

export function getBlogFromTitle(title: string, setBlogCallback: IBlogSetCallback) {
    const queryString = query(BLOGS_COLL_REF, where("title","==",title));

    // This should only ever return one document. Firebase doesn't support uniqueness constraints
    // but we'll enforce it during publishing of a blog.
    try {
        getDocs(queryString).then((querySnapshot) => {
            setBlogCallback(querySnapshot.docs[0].data() as IBlogReference);
        });
    }
    catch (e: any) {
        throw new Error(e);
    }
}

// Upload an image to firebase storage. Takes a file via the JavaScript File API, and a path to save the file to.
// Returns 
export function uploadNewImage(file: File, filePath: string) {
    const storageRef = ref(storage, filePath);
    return uploadBytes(storageRef, file);
}

export class BlogComment {
    ID: string = "";
    text: string = "";
    edited: boolean = false;
    childComments: BlogComment[] = [];  // comments are doubly-linked for ease of traversal / construction  (via parent IDs)
    parentCommentID: string;            // and ease of rendering (via children comments). Only parentID is stored in database. Child comments constructed upon retrieval.
    postDate: Timestamp = Timestamp.now();
    votes: number = 0;
    userName: string = "";
    userPhotoUrl: string = "";

    // Construct from database object
    constructor(blogCommentObj: QueryDocumentSnapshot<DocumentData>) {
        this.ID = blogCommentObj.id;
        this.text = blogCommentObj.get("text");
        this.edited = blogCommentObj.get("edited");
        this.parentCommentID = blogCommentObj.get("parentCommentID");
        this.postDate = blogCommentObj.get("postDate");
        this.votes = blogCommentObj.get("votes");
        
        getAppUserByID(blogCommentObj.get("userID")).then((userSnapshot) => {
            this.userName = userSnapshot.get("name");
            this.userPhotoUrl = userSnapshot.get("photoUrl");
        });
    }

    // Return a new comment in object format for posting to firebase
    static Object(text: string, parentCommentID: string, userID: string) {
        return(
            {
                edited: false,
                parentCommentID: parentCommentID,
                postDate: Timestamp.now(),
                text: text,
                userID: userID,
                votes: 0
            }
        )
    }
}

export interface ISetBlogComments {
    (comments: BlogComment[]): void;
}

export function loadCommentsForBlog(blogRef: IBlogReference, setBlogComments: ISetBlogComments) {
    const commentsCollectionPath = BLOG_COLLECTION + "/" + blogRef.ID  + "/BlogComments";
    const commentsCollectionRef = collection(db, commentsCollectionPath); 
    
    getDocs(commentsCollectionRef).then((querySnapshot) => {
        // Initialize with root-level comments
        const rootComments = querySnapshot.docs.filter((doc) => doc.get("parentCommentID") === -1);
        const nonRootComments = querySnapshot.docs.filter((doc) => doc.get("parentCommentID") !== -1);

        const linkedComments = linkUpBlogComments(rootComments, nonRootComments);
        setBlogComments(linkedComments);
    });
    
}

// Recursive helper function to link together blog comments via parent-child relationships
function linkUpBlogComments(currComments: QueryDocumentSnapshot<DocumentData>[], otherComments: QueryDocumentSnapshot<DocumentData>[]) {
    let comments: BlogComment[] = [];

    currComments.forEach((parentComment) => {
        const blogComment = new BlogComment(parentComment);

        const childrenDocs = otherComments.filter((doc) => doc.get("parentCommentID") === parentComment.id);
        const nonChildrenDocs = otherComments.filter((doc) => doc.get("parentCommentID") !== parentComment.id);

        const childrenComments = linkUpBlogComments(childrenDocs, nonChildrenDocs);
        childrenComments.forEach((child) => blogComment.childComments.push(child));

        comments.push(blogComment);
    })

    return comments;
}

export function postBlogComment(blogRef: IBlogReference, text: string, parentCommentID: string, userID: string) {

    const firebaseComment = BlogComment.Object(text, parentCommentID, userID);  // firebase only accepts data in plain object format
    const commentsCollectionPath = BLOG_COLLECTION + "/" + blogRef.ID;
    const commentsCollectionRef = collection(db, commentsCollectionPath);

    addDoc(commentsCollectionRef,firebaseComment);
}