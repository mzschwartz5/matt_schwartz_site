import { initializeApp } from "firebase/app"
import { getFirestore, QuerySnapshot } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";


const firebaseApp = initializeApp({
    projectId: 'mattzschwartz'
});

const db = getFirestore(firebaseApp);

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