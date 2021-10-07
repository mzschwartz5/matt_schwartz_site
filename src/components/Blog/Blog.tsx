import { useEffect } from "react";
import { useState } from "react";
import ReactHtmlParser from 'react-html-parser';
import { loadAllBlogReferences, IBlogReference, loadBlogContent } from "../../data/blogs_db";

interface IBlogProps {

}

const Blog: React.FunctionComponent<IBlogProps> = (props:IBlogProps): JSX.Element =>
{
    const [blogReferences,setBlogReferences] = useState<IBlogReference[]>([]);
    const [blogContent, setBlogContent] = useState<string>("");

    // Load metadata for all blogs on component mount
    useEffect(() => {
        loadAllBlogReferences(setBlogReferences);
    }, []);     


    // Temporarily using a button to test loading a blog. 
    const loadBlogClickHandler = () => {
        const blogPath = blogReferences[0].storagePath;
        loadBlogContent(blogPath, setBlogContent)
    };

    return(
        <>
            <button onClick={loadBlogClickHandler}>Click to load the blog</button> 
            <div>{ReactHtmlParser(blogContent)}</div>
        </>
    );
}
export default Blog;