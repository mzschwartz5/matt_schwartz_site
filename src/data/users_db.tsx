import { User } from "@firebase/auth";
import { collection, doc, DocumentReference, getDoc, setDoc } from "@firebase/firestore";
import { IBlogReference } from "./blogs_db";
import { db } from "./firebase";

const USER_COLLECTION = "Users";
const COLLECTION_REF = collection(db, USER_COLLECTION);
let ACTIVE_USER: AppUser;

export class AppUser {
    email: string;
    isAdmin: boolean;
    name: string;
    photoUrl: string;
    subscribedBlogs: DocumentReference<IBlogReference>[];
    userId: string;

    constructor(user: User) {
        this.email = String(user.email);
        this.isAdmin = false;
        this.name = String(user.displayName);
        this.photoUrl = String(user.photoURL);
        this.subscribedBlogs = [];
        this.userId = user.uid;
    }

    // To file a new user, firebase requires the input to be a plain object
    toFirebase() {
        return(
            {
                email: this.email,
                isAdmin: this.isAdmin,
                name: this.name,
                photoUrl: this.photoUrl,
                subscribedBlogs: this.subscribedBlogs,
                userId: this.userId
            }
        )
    }
}

export function getAppUser(user: User) {
    const userDoc = doc(COLLECTION_REF, user.uid);

    try {
        return getDoc(userDoc);
    }
    catch (e: any) {
        throw new Error(e);
    }
}

export function getAppUserByID(userID: string) {
    const userDoc = doc(COLLECTION_REF, userID);
    try {
        return getDoc(userDoc);
    }
    catch (e: any) {
        throw new Error(e);
    }
}

export function loginOrCreateNewUser(user: User) {
    getAppUser(user).then((querySnapshot) => {

        if (!querySnapshot.exists) {   // create new user
            const appUser = new AppUser(user);
            const userDocRef = doc(COLLECTION_REF, user.uid);
            setDoc(userDocRef, appUser.toFirebase());
            setActiveUser(appUser);
        }
        else {
            const appUser = querySnapshot.data() as AppUser;
            setActiveUser(appUser);
        }
    });

}

// Simple implementation of read-only global data (active user global defined at top)
export function getActiveUser() {return ACTIVE_USER}

function setActiveUser(user: AppUser) {ACTIVE_USER = user;}