import { Button, Snackbar, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useEffect, useState, useCallback } from 'react';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { BlogComment as BlogCommentData, editBlogComment, getBlogFromTitle, IBlogReference, loadBlogContent, loadCommentsForBlog, postBlogComment, voteOnBlogComment, VoteType } from '../../data/blogs_db';
import { activeUserAtom } from '../../data/users_db';
import DocumentSkeleton from '../core/DocumentSkeleton';
import BlogComment from './BlogComment';
import './BlogContent.css';
import CommentSection from './CommentSection';
import UpArrow from "@material-ui/icons/ArrowUpward";
import CommentIcon from "@material-ui/icons/Comment";
import smoothscroll from 'smoothscroll-polyfill';

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
    const activeUser = useRecoilValue(activeUserAtom);

    useEffect(() => {
        // Load blog content and comments on mount
        const loadBlog = (blogRef: IBlogReference) => {
            loadBlogContent((blogRef.storagePath + "/content.md.html"), setBlogContent);
            loadCommentsForBlog(blogRef, setBlogComments, activeUser); 
            setBlogRef(blogRef);
        }

        jumpToTopOfPage();
        const blogRef = getBlogFromTitle(blogTitle);
        blogRef.then(ref => loadBlog(ref));

        smoothscroll.polyfill(); // kick off polyfill support for smooth scrolling (for browsers like Safari that don't natively support it) 
    },[activeUser]);

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

    const editComment = useCallback((newText: string, commentID: string) => {
        if (!validateBlogContext("Please log in to edit a comment.")) return;
        editBlogComment(commentID, newText, blogRef!.ID);
    },[blogRef, activeUser, validateBlogContext]);

    const voteOnBlog = useCallback((voteType: VoteType, voteChange: number, commentID: string) => {
        if (!validateBlogContext("Please log in to vote on a comment.")) return;
        voteOnBlogComment(voteType, voteChange, blogRef!.ID, commentID, activeUser!.userId);
    }, [blogRef, activeUser, validateBlogContext]);

    // Because the active user can lag behind blog-load on page refresh, the comments get mounted with an undefined user. By adding Date.now() to the key,
    // each comment gets re-mounted on every render, which clears the state with the undefined user. For the sake of performance, we then need to wrap this 
    // in a useCallback, dependent on blogComments, so it only remounts when blogComments change (e.g. when the activeUser changes). (Making it dependent on activeUser
    // wouldn't be sufficient, because we'd just hit another race condition between the user getting defined and the comments loading)
    const comments = useCallback(() => blogComments?.map((comment) => {
        return <BlogComment comment={comment} key={comment.ID + Date.now()} postComment={postReplyToComment} editComment={editComment} voteOnBlog={voteOnBlog}/>
    }), [blogComments])();


    return(
        // Note: most styles on this component are applied via a separate style sheet file, to allow targeting of 
        // injected html (the blog is loaded as a markdown document). Styles that rely on the Theme are applied 
        // the usual way, via makeStyles.
        <>
            <div className={"blog-container " + classes.blogContainer}>
                <h1 id="blog-title">{blogTitle}</h1>
                <div className="blog-meta" >{blogRef?.author + " - " + blogRef?.postDate.toDate().toDateString()}</div>
                <hr id="blog-divider"/>
                {blogContent ? parse(blogContent) : <DocumentSkeleton/>}
                <hr />
                <CommentSection id="comment-section-top" comments={comments} postNewComment={postNewComment}/>
                <div className={classes.buttonContainer}>
                    <Button onClick={scrollToTopOfPage} className={classes.buttons}>    
                        <UpArrow/>
                    </Button>
                    <Button onClick={scrollToCommentSection} className={classes.buttons} >    
                        <CommentIcon/>
                    </Button>
                </div>
            </div>
            <Snackbar open={errorMessage !== ""} autoHideDuration={6000} message={errorMessage} onClose={closeSnackbar}/>
        </>
    );
}

const scrollToTopOfPage = () => {
    document.getElementById("root")?.scrollIntoView({behavior: 'smooth'});   
}

const scrollToCommentSection = () => {
    document.getElementById("comment-section-top")?.scrollIntoView({behavior: 'smooth'});   
}

const jumpToTopOfPage = () => {
    document.getElementById("root")?.scrollIntoView();
}

const useBlogStyles = makeStyles((theme: Theme) => {
    return({
        blogContainer: {
            color: theme.palette.paper.main,
        },

        buttonContainer: {
            position: "fixed",
            right: "0",
            bottom: "0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
        },

        buttons: {
            color: theme.palette.paper.main,
            backgroundColor: theme.palette.tertiary.main,
            height: "8vh",
            maxWidth: "8vh",
            minWidth: "8vh",
            padding: "0px",
            borderRadius: "100%",
            cursor: "pointer",
            border: "1px outset",
            borderColor: theme.palette.primary.main,
            zIndex: 1,
            boxShadow: "1px 1px 4px black",
            margin: "0px 15px 15px 0px",
            alignSelf: "flex-end",

            "&:hover": {
                boxShadow: "0px 0px 0px",
                backgroundColor: "#10608a"
            },
        },
    })
})

export default BlogContent;