import { initializeApp } from "firebase/app"
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseApp = initializeApp({
    projectId: "mattzschwartz",
    storageBucket: "gs://mattzschwartz.appspot.com"
})

export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export async function getDocumentByName(collectionName: string, docName: string, fieldName: string = "name") {
    const collectionRef = collection(db, collectionName);
    const queryString = query(collectionRef, where(fieldName,"==",docName));

    try {
        const querySnapshot = await getDocs(queryString);
        return querySnapshot;
    }
    catch (e) {
        throw new Error(e);
    }
}