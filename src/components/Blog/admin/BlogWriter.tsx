import { useEffect, useState } from "react";
import { IBlogReference, loadBlogContent } from "../../../data/blogs_db";
import MarkdownEditor from "../admin/MarkdownEditor";

interface IBlogWriterProps {
    blogRef: IBlogReference;
}  

const BlogWriter: React.FunctionComponent<IBlogWriterProps> = (props:IBlogWriterProps): JSX.Element =>
{
    const {blogRef} = props;
    const [blogContent, setBlogContent] = useState("");
    
    useEffect(() => {
        try {
            loadBlogContent((blogRef.storagePath + "/content.md.html"), setBlogContent);            
        } catch (error) {
            console.log(error);
        }
    }, [])

    return(
        <MarkdownEditor blogRef={blogRef} defaultValue={blogContent}/>
    );
}



export default BlogWriter;