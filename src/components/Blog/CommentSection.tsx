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
            <PostComment className={classes.post} active={true} setActiveState={(val: boolean) => {/* permanantly active */}} postComment={postNewComment} />
            <div className="comment-container">
                {comments}
            </div>
        </>
    );
}

const useCommentStyles = makeStyles((theme: Theme) => {
    return({
        post: {
            marginBottom: "15px"
        },

        login: {
            marginLeft: "auto"
        }
        
    })
})

export default CommentSection;