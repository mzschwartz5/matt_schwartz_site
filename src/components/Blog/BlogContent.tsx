import { Button, Snackbar, Theme } from '@material-ui/core';
import { SpeedDial } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { useEffect, useState, useCallback } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { BlogComment as BlogCommentData, getBlogFromTitle, IBlogReference, loadBlogContent, loadCommentsForBlog, postBlogComment, voteOnBlogComment, VoteType } from '../../data/blogs_db';
import { activeUserAtom } from '../../data/users_db';
import DocumentSkeleton from '../core/DocumentSkeleton';
import BlogComment from './BlogComment';
import './BlogContent.css';
import CommentSection from './CommentSection';
import UpArrow from "@material-ui/icons/ArrowUpward";
import CommentIcon from "@material-ui/icons/Comment";

interface IBlogContentProps {
}

const BlogContent: React.FunctionComponent<IBlogContentProps> = (props:IBlogContentProps): JSX.Element =>
{
    const { blogTitle } = useParams<{blogTitle: string}>(); // if page loaded from URL, we won't have access to the blog object yet. So get title from URL -> load blog.
    const classes = useBlogStyles();
    const [blogContent, setBlogContent] = useState<string>("");
    const [blogComments, setBlogComments] = useState<BlogCommentData[]>();
    const [blogRef, setBlogRef] = useState<IBlogReference>();
    const [errorMessage, setErrorMessage] = useState("");
    const closeSnackbar = () => setErrorMessage("");
    const activeUser = useRecoilValue(activeUserAtom)

    useEffect(() => {
        // Load blog content and comments on mount
        const loadBlog = (blogRef: IBlogReference) => {
            loadBlogContent((blogRef.storagePath + "/content.md.html"), setBlogContent);
            loadCommentsForBlog(blogRef, setBlogComments, activeUser); 
            setBlogRef(blogRef);
        }

        getBlogFromTitle(blogTitle, loadBlog);
    },[]);


    const validateBlogContext = useCallback((errorText: string) => {
        if (!blogRef) return false;
        if (!activeUser) {
            setErrorMessage(errorText);
            throw new Error("No user logged in");            
        }
        return true;
    }, [blogRef, activeUser]);

    const postReplyToComment = useCallback((text: string, parentCommentID: string) => {
        if (!validateBlogContext("Please log in to reply to a comment.")) return;
        postBlogComment(blogRef!.ID, text, parentCommentID, activeUser!.userId); // bake user and blog IDs into this function before passing down to children
    },[blogRef, activeUser, validateBlogContext]);

    const postNewComment = useCallback((text: string) => {
        if (!validateBlogContext("Please log in to post a new comment.")) return;
        postBlogComment(blogRef!.ID, text, "-1", activeUser!.userId);
    },[blogRef, activeUser, validateBlogContext]);

    const voteOnBlog = useCallback((voteType: VoteType, commentID: string) => {
        if (!validateBlogContext("Please log in to vote on a comment.")) return;
        voteOnBlogComment(voteType, blogRef!.ID, commentID, activeUser!.userId);
    }, [blogRef, activeUser, validateBlogContext]);


    const comments = blogComments?.map((comment) => {
        return <BlogComment comment={comment} key={comment.ID} postComment={postReplyToComment} voteOnBlog={voteOnBlog}/>
    })

    return(
        // Note: most styles on this component are applied via a separate style sheet file, to allow targeting of 
        // injected html (the blog is loaded as a markdown document). Styles that rely on the Theme are applied 
        // the usual way, via makeStyles.
        <>
            <div className={"blog-container " + classes.blogContainer}>
                <h1 id="blog-title">{blogTitle}</h1>
                <div className="blog-meta" >{blogRef?.author + " - " + blogRef?.postDate.toDate().toDateString()}</div>
                <hr id="blog-divider"/>
                {blogContent ? ReactHtmlParser(blogContent) : <DocumentSkeleton/>}
                <hr />
                <CommentSection id="comment-section" comments={comments} postNewComment={postNewComment}/>
            </div>
            <Button onClick={toTopOfPage} className={classes.buttons + " " + classes.pageTopButton}>    
                <UpArrow/>
            </Button>
            <Button onClick={toCommentSection} className={classes.buttons + " " + classes.commentSectionButton} >    
                <CommentIcon/>
            </Button>
            <Snackbar open={errorMessage !== ""} autoHideDuration={6000} message={errorMessage} onClose={closeSnackbar}/>
        </>
    );
}

const toTopOfPage = () => {
    document.getElementById("root")?.scrollIntoView({behavior: 'smooth'});   
}

const toCommentSection = () => {
    document.getElementById("comment-section")?.scrollIntoView({behavior: 'smooth'});   
}

const useBlogStyles = makeStyles((theme: Theme) => {
    return({
        blogContainer: {
            color: theme.palette.paper.main,
        },

        buttons: {
            color: theme.palette.paper.main,
            backgroundColor: theme.palette.tertiary.main,
            height: "50px",
            maxWidth: "50px",
            minWidth: "50px",
            padding: "0px",
            borderRadius: "100%",
            position: "fixed",
            cursor: "pointer",
            border: "1px outset",
            borderColor: theme.palette.primary.main,
            zIndex: 1,
            boxShadow: "1px 1px 4px black",

            "&:hover": {
                boxShadow: "0px 0px 0px",
                backgroundColor: "#10608a"
            },
        },

        pageTopButton: {
            bottom: "12%",
            right: "1.5%",
        },

        commentSectionButton: {
            bottom: "2%",
            right: "1.5%",
        }
    })
})

export default BlogContent;