import BlogComment from "./BlogComment";

interface ICommentSection {

}

const CommentSection: React.FunctionComponent<ICommentSection> = (props:ICommentSection): JSX.Element =>
{

    return(
        <>
            <div>
                <hr />
                <span>99 Comments</span>
                <span>Sort By</span>
                <span>Log In</span>
            </div>
            <div>
            </div>
        </>
    );
}

export default CommentSection;