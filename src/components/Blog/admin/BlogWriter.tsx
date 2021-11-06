import { useEffect, useState } from "react";
import { IBlogReference, loadBlogContent } from "../../../data/blogs_db";
import MarkdownEditor from "../admin/MarkdownEditor";

interface IBlogWriterProps {
    blogRef: IBlogReference;
}  

const BlogWriter: React.FunctionComponent<IBlogWriterProps> = (props:IBlogWriterProps): JSX.Element =>
{
    const {blogRef} = props;
    const [mdEditor, setMdEditor] = useState<JSX.Element>();

    const initializeBlog = (content: string) => {
        setMdEditor(
            <MarkdownEditor blogRef={blogRef} defaultValue={content}/>
        );
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