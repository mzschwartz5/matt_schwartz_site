import { Snackbar } from '@material-ui/core';
import { useEffect, useState, useCallback } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { BlogComment as BlogCommentData, getBlogFromTitle, IBlogReference, loadBlogContent, loadCommentsForBlog, postBlogComment, voteOnBlogComment, VoteType } from '../../data/blogs_db';
import { activeUserAtom } from '../../data/users_db';
import DocumentSkeleton from '../core/DocumentSkeleton';
import BlogComment from './BlogComment';
import './BlogContent.css';

interface IBlogContentProps {
}

const BlogContent: React.FunctionComponent<IBlogContentProps> = (props:IBlogContentProps): JSX.Element =>
{
    const { blogTitle } = useParams<{blogTitle: string}>(); // if page loaded from URL, we won't have access to the blog object yet. So get title from URL -> load blog.
    const [blogContent, setBlogContent] = useState<string>("");
    const [blogComments, setBlogComments] = useState<BlogCommentData[]>();
    const [blogRef, setBlogRef] = useState<IBlogReference>();
    const [errorMessage, setErrorMessage] = useState("");
    const closeSnackbar = () => setErrorMessage("");
    const activeUser = useRecoilValue(activeUserAtom)

    const postComment =  useCallback((text: string, parentCommentID: string) => {
        if (!blogRef) return;
        if (!activeUser) {
            setErrorMessage("Please log in to post a comment.");
            throw new Error("No user logged in");
        }
        
        postBlogComment(blogRef.ID, text, parentCommentID, activeUser.userId); // bake user and blog IDs into this function before passing down to children

    },[blogRef, activeUser]);
    const voteOnBlog = useCallback((voteType: VoteType, commentID: string) => {
        if (!blogRef) return;
        if (!activeUser) {
            setErrorMessage("Please log in to vote on a comment.");
            throw new Error("No user logged in");            
        }

        voteOnBlogComment(voteType, blogRef.ID, commentID, activeUser.userId);
    }, [blogRef, activeUser]);

    useEffect(() => {

        // Load blog content and comments on mount
        const loadBlog = (blogRef: IBlogReference) => {
            loadBlogContent(blogRef.storagePath, setBlogContent);
            loadCommentsForBlog(blogRef, setBlogComments, activeUser); 
            setBlogRef(blogRef);
        }

        getBlogFromTitle(blogTitle, loadBlog);


    },[]);



    const comments = blogComments?.map((comment) => {
        return <BlogComment comment={comment} key={comment.ID} postComment={postComment} voteOnBlog={voteOnBlog}/>
    })

    return(
        <>
            <div className="blog-container">
                <h1 className="blog-title">{blogTitle}</h1>
                <div className="blog-meta" >{blogRef?.author + " - " + blogRef?.postDate.toDate().toDateString()}</div>
                <hr />
                {blogContent ? ReactHtmlParser(blogContent) : <DocumentSkeleton/>}
                <hr />
                <div className="comment-container">
                    {comments}
                </div>
            </div>
            <Snackbar open={errorMessage !== ""} autoHideDuration={6000} message={errorMessage} onClose={closeSnackbar}/>
        </>
    );
}

export default BlogContent;