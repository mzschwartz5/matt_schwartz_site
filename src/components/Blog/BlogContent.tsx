import { useEffect } from 'react';
import { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useParams } from 'react-router-dom';
import { getBlogFromTitle, IBlogReference } from '../../data/blogs_db';

interface IBlogContentProps {
    htmlContent: string;
    loadBlogContent: (path: string) => void,
}

const BlogContent: React.FunctionComponent<IBlogContentProps> = (props:IBlogContentProps): JSX.Element =>
{
    const {htmlContent, loadBlogContent} = props;
    const { blogTitle } = useParams<{blogTitle: string}>();
    const [blogReference, setBlogReference] = useState<IBlogReference>();


    // Work on this
    useEffect(() => {
        // When loading a specific blog page directly from a URL, we need to first load the content.
        if (!htmlContent && !blogReference && blogTitle) {
            getBlogFromTitle(blogTitle, setBlogReference);
        }
        if (blogReference) loadBlogContent(blogReference.storagePath)
    }, [blogReference]);

    return(
        <div>{ReactHtmlParser(htmlContent)}</div>
    );
}
export default BlogContent;