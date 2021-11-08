import { makeStyles, Theme } from "@material-ui/core";
import AuthLogin from "../core/AuthLogin";
import PostComment from "./PostComment";

interface ICommentSection {
    comments: JSX.Element[] | undefined;
    postNewComment: (text: string) => void;
    id: string; 
}

const CommentSection: React.FunctionComponent<ICommentSection> = (props:ICommentSection): JSX.Element =>
{
    const {comments, postNewComment, id} = props;
    const classes = useCommentStyles();

    return(
        <>
            <div id={id} className = {classes.root}>
                <PostComment className={classes.post} active={true} setActiveState={(val: boolean) => {/* permanantly active */}} postComment={postNewComment} />
                <AuthLogin id="login" />
            </div>
            <div className="comment-container">
                {comments}
            </div>
        </>
    );
}

const useCommentStyles = makeStyles((theme: Theme) => {
    return({
        root: {
            display: "flex",
            alignItems: "center",
            "& #login": {
                backgroundColor: "transparent",
                color: theme.palette.paper.main,
                borderColor: theme.palette.paper.main,
                border: "1px solid",

                "&:hover": {
                    backgroundColor: theme.palette.secondary.main
                }
           }
        },

        post: {
            flexBasis: "95%"
        },

        
    })
})

export default CommentSection;