import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app"
import { useState } from "react";
import ReactHtmlParser from 'react-html-parser';

// Firebase init
const firebaseApp = initializeApp({
    projectId: "mattzschwartz",
    storageBucket: "gs://mattzschwartz.appspot.com"
})
const storage = getStorage(firebaseApp);

interface IBlogProps {

}

const Blog: React.FunctionComponent<IBlogProps> = (props:IBlogProps): JSX.Element =>
{
    const [blogText, setBlogText] = useState<string>("");

    getDownloadURL(ref(storage, 'blog_content/First Blog/Untitled Document.md.html'))
    .then((url) => {

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        
        xhr.onload = (event) => {
            const response = xhr.response;
            response.text().then((text: string) => setBlogText(text));
        };
        xhr.open('GET', url);

        xhr.send();
    
    });

    return(
        <div>{ReactHtmlParser(blogText)}</div>
    );
}

export default Blog;