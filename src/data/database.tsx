import { ref } from "@firebase/storage";
import { uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export const blogContentFolder = "blog_content/";

// Upload an image to firebase storage. Takes a file via the JavaScript File API, and a path to save the file to.
export function uploadNewImage(file: File, filePath: string) {
    const storageRef = ref(storage, filePath);
    return uploadBytes(storageRef, file);
}