import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseApp = initializeApp({
    projectId: "mattzschwartz",
    storageBucket: "gs://mattzschwartz.appspot.com"
})

export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);