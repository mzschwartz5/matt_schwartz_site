import {collection, DocumentReference, getDocs, query, Timestamp} from "firebase/firestore";
import {IBlogReference} from "./blogs_db";
import { db } from "./firebase";

const PROJECT_COLLECTION = "Projects"

export interface IProject {
    blogReference: DocumentReference<IBlogReference>;
    dateStarted: Timestamp;
    description: string;
    featuredImage: string;
    githubUrl: string;
    status: number;
    title: string;
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

            projectSetCallback(docs);
        });
    }
    catch (e: any) {
        throw new Error(e);
    }
}