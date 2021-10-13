import { collection, query, getDocs, Timestamp, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./database";

const BLOG_COLLECTION = "BlogReferences";

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
    const collectionRef = collection(db, BLOG_COLLECTION);
    const queryString = query(collectionRef);

    try {
        let docs: IBlogReference[] = [];

        // A "QuerySnapshot" is Firebase's term for a query result
        getDocs(queryString).then((querySnapshot) => {

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
    const collectionRef = collection(db, BLOG_COLLECTION);
    const queryString = query(collectionRef, where("title","==",title));

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