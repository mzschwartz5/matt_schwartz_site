import {collection, doc, getDocs, query, setDoc, Timestamp} from "firebase/firestore";
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
    tags: string[];
    hidden: boolean;
}

export enum ProjectStatus {
    draft = 0,
    published = 1
}

// Can we extract this logic into the database.tsx routine for common use in projects_db and blogs_db?
export async function loadAllProjects() {
    const collectionRef = collection(db, PROJECT_COLLECTION);
    const queryString = query(collectionRef);
    let docs: IProject[] = [];

    try {
        // A "QuerySnapshot" is Firebase's term for a query result
        const querySnapshot = await getDocs(queryString)
        querySnapshot.forEach((doc) => docs.push(doc.data() as IProject)); // is this type assertion dangerous?
        docs.sort(sortProjectsByStartDate);

        docs.forEach((project) => {
            console.log(project.title);
            console.log(project.tags);
        });
    }
    catch (e: any) {
        throw new Error(e);
    }

    return docs;
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