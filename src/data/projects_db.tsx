import {collection, doc, DocumentReference, getDocs, query, setDoc, Timestamp} from "firebase/firestore";
import {IBlogReference} from "./blogs_db";
import { db } from "./firebase";

const PROJECT_COLLECTION = "Projects"
const PROJECT_COLLECTION_REF = collection(db, PROJECT_COLLECTION);

export interface IProject {
    blogReference: string;  // url of relevant blog
    dateStarted: Timestamp;
    dateEnded: Timestamp | null;
    description: string;
    featuredImage: string;
    githubUrl: string;
    status: ProjectStatus;
    title: string;
}

export enum ProjectStatus {
    draft = 0,
    published = 1
}

interface IProjectSetCallback {
    (refs: IProject[]): void;
}

// Can we extract this logic into the database.tsx routine for common use in projects_db and blogs_db?
export function loadAllProjects (projectSetCallback: IProjectSetCallback) {
    const collectionRef = collection(db, PROJECT_COLLECTION);
    const queryString = query(collectionRef);

    try {
        let docs: IProject[] = [];

        // A "QuerySnapshot" is Firebase's term for a query result
        getDocs(queryString).then((querySnapshot) => {

            querySnapshot.forEach((doc) => docs.push(doc.data() as IProject)); // is this type assertion dangerous?

            projectSetCallback(docs.sort(sortProjectsByStartDate));
        });
    }
    catch (e: any) {
        throw new Error(e);
    }
}

// Newest first
const sortProjectsByStartDate = (a: IProject, b: IProject) => {
    return(b.dateStarted.seconds - a.dateStarted.seconds);
}

export function createProject(projectRef: IProject) {
    const projectDoc = doc(PROJECT_COLLECTION_REF);
    setDoc(projectDoc, projectRef);
    
    return projectDoc.id;
}