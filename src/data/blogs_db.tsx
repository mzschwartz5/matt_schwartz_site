import { getDocumentByName } from "./database";
const BLOG_COLLECTION = "Blogs";

export function readBlogByName(blogName: string) {
    const querySnapshot = getDocumentByName(BLOG_COLLECTION, blogName);
}