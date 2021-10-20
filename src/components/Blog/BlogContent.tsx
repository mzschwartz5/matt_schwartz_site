import { useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useParams } from 'react-router-dom';
import { BlogComment as BlogCommentData, getBlogFromTitle, IBlogReference } from '../../data/blogs_db';
import DocumentSkeleton from '../core/DocumentSkeleton';
import BlogComment from './BlogComment';
import './BlogContent.css';

interface IBlogContentProps {
    htmlContent: string;
    blogComments?: BlogCommentData[];
    blogRef?: IBlogReference;
    loadBlogContent: (path: IBlogReference) => void;
}

const BlogContent: React.FunctionComponent<IBlogContentProps> = (props:IBlogContentProps): JSX.Element =>
{
    const {htmlContent, blogComments, blogRef, loadBlogContent} = props;
    const { blogTitle } = useParams<{blogTitle: string}>(); // if page loaded from URL, we won't have access to the blog object yet. So get title from URL -> load blog.

    // Force to top on every rerender
    window.scrollTo(0,0)

    useEffect(() => {

        // When loading a specific blog page directly from a URL, we need to first load the content.
        if (htmlContent) return;

        const setBlog = (blogRef: IBlogReference) => loadBlogContent(blogRef);
        getBlogFromTitle(blogTitle, setBlog);
    },[]);

    const comments = blogComments?.map((comment) => {
        return <BlogComment comment={comment} key={comment.ID}/>
    })

    return(
        <>
            <div className="blog-container">
                <h1 className="blog-title">{blogTitle}</h1>
                <div className="blog-meta" >{blogRef?.author + " - " + blogRef?.postDate.toDate().toDateString()}</div>
                <hr />
                {htmlContent ? ReactHtmlParser(htmlContent) : <DocumentSkeleton/>}
                <hr />
                <div className="comment-container">
                    {comments}
                </div>
            </div>
        </>
    );
}

export default BlogContent;