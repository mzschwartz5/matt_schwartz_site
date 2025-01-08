import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseApp = initializeApp({
    projectId: "mattzschwartz",
    storageBucket: "gs://mattzschwartz.appspot.com",
    authDomain: "mattzschwartz.web.app",
    databaseURL: "https://mattzschwartz.firebaseio.com",
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
})

export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
export function getCurrentAuthUser() {
    return auth.currentUser;
}