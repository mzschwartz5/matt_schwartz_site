import { Timestamp } from '@firebase/firestore';
import { useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useParams } from 'react-router-dom';
import { getBlogFromTitle, IBlogReference } from '../../data/blogs_db';
import DocumentSkeleton from '../core/DocumentSkeleton';
import './BlogContent.css';

interface IBlogContentProps {
    htmlContent: string;
    author?: string;
    date?: Timestamp;
    loadBlogContent: (path: IBlogReference) => void;
}

const BlogContent: React.FunctionComponent<IBlogContentProps> = (props:IBlogContentProps): JSX.Element =>
{
    const {htmlContent, author, date, loadBlogContent} = props;
    const { blogTitle } = useParams<{blogTitle: string}>(); // if page loaded from URL, we won't have access to the blog object yet. So get title from URL -> load blog.

    useEffect(() => window.scrollTo(0,0));

    useEffect(() => {
        // When loading a specific blog page directly from a URL, we need to first load the content.
        if (htmlContent) return;

        const setBlog = (blogRef: IBlogReference) => loadBlogContent(blogRef);
        getBlogFromTitle(blogTitle, setBlog);
    },[]);

    return(
        <>
            <div className="blog-container">
                <h1 className="blog-title">{blogTitle}</h1>
                <div className="blog-meta" >{author + " - " + date?.toDate().toDateString()}</div>
                <hr />
                {htmlContent ? ReactHtmlParser(htmlContent) : <DocumentSkeleton/>}
            </div>
        </>
    );
}

export default BlogContent;