import { Avatar, makeStyles } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownIcon from "@material-ui/icons/ThumbDownOutlined";
import { BlogComment as BlogCommentData} from "../../data/blogs_db";

interface IBlogCommentProps {
    comment: BlogCommentData
}

const BlogComment: React.FunctionComponent<IBlogCommentProps> = (props:IBlogCommentProps): JSX.Element =>
{
    const {comment} = props;
    const classes = commentStyles();

    const children = comment.childComments.map((child) => {
        return <BlogComment comment={child} key={comment.ID}/>
    });

    return(
        <div className={classes.commentContainer}>
            <div className={classes.avatar}>
                <Avatar src={comment.userPhotoUrl} imgProps={{referrerPolicy: "no-referrer"}} />
            </div>
            <div className={classes.commentData}>
                <div className={classes.metaDataSection}>
                    <span className={classes.userName}>{comment.userName}</span>
                    <span className={classes.date}>{comment.postDate.toDate().toDateString()}</span>
                </div>
                <div className={classes.textSection}>
                    <span>{comment.text}</span>
                </div>
                <div className={classes.interactSection}>
                    {comment.votes}
                    <ThumbUpIcon className={classes.votingIcons} fontSize="small" />
                    <ThumbDownIcon className={classes.votingIcons} fontSize="small"/>
                    <div className={classes.replyButton}> Reply </div>
                </div>
            </div>
            {children}
        </div>
    );
}

const commentStyles = makeStyles({
    commentContainer: {
        margin: "10px 0px 15px 50px"
    },

    avatar: {
        width: "auto",
        display: "inline-block",
        verticalAlign: "top"
    },

    commentData: {
        display: "inline-block",
        marginLeft: "10px"
    },

    userName: {
        color: "lightblue",
        margin: "0px 5px 0px 0px",
        fontWeight: "bold"
    },

    date: {
        color: "lightgray",
        fontWeight: "lighter"
    },

    votingIcons: {
        cursor: "pointer",
        marginLeft: "10px",
        color: "lightgrey"
    },

    interactSection: {
        display: "flex",
        alignItems: "center",
        marginBottom: "5px"
    },

    textSection: {
        margin: "5px 0px 5px 0px"
    },

    metaDataSection: {
    
    },

    replyButton: {
        fontWeight: "bold",
        marginLeft: "30px",
        color: "lightgrey",
        display: "flex",  // this isn't working... tried to center the text but no luck.
        alignItems: "center",
        justifyContent: "center"
    }
}); 

export default BlogComment;