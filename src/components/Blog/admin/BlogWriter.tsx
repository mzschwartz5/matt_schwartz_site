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
    const [mdEditor, setMdEditor] = useState<JSX.Element>();

    const initializeBlog = (blogContent: string) => {
        setMdEditor(
            <MarkdownEditor blogRef={blogRef} defaultValue={blogContent}/>  // we initialize it here because once defaultText is set, it cannot be changed. To do so requires a whole new component.
        );
        setBlogContent(blogContent);
    }

    useEffect(() => {
        try {
            loadBlogContent((blogRef.storagePath + "/rawText.txt"), initializeBlog);            
        } catch (error) {
            console.log(error);
        }
    }, [])

    return(
        <>
            {mdEditor}
        </>
    );
}



export default BlogWriter;