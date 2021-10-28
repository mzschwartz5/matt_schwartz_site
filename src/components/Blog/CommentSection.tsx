import PostComment from "./PostComment";

interface ICommentSection {
    comments: JSX.Element[] | undefined;
    postNewComment: (text: string) => void; 
}

const CommentSection: React.FunctionComponent<ICommentSection> = (props:ICommentSection): JSX.Element =>
{
    const {comments, postNewComment} = props;

    return(
        <>
            <PostComment active={true} setActiveState={(val: boolean) => {/* permanantly active */}} postComment={postNewComment} />
            <div className="comment-container">
                {comments}
            </div>
        </>
    );
}

export default CommentSection;