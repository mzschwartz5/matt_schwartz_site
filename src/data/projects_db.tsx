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
    featuredGif: string;
    githubUrl: string;
    liveDemoUrl: string;
    videoUrl: string;
    status: ProjectStatus;
    title: string;
    tags: string[];
    hidden: boolean;
    orderID: number;
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
        querySnapshot.forEach((doc) => {
            const project = doc.data() as IProject; // is this type assertion dangerous?
            if (project.hidden) {
                return;
            }

            docs.push(project);
            console.log(project.orderID);
        });
        docs.sort(sortProjectsByOrderID);
    }
    catch (e: any) {
        throw new Error(e);
    }

    return docs;
}

const sortProjectsByOrderID = (a: IProject, b: IProject) => {
    return a.orderID - b.orderID;
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