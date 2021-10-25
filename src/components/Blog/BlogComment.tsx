import { Avatar, makeStyles } from "@material-ui/core";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { BlogComment as BlogCommentData, VoteType} from "../../data/blogs_db";
import PostComment from "./PostComment";
import { useState } from "react";
import { AppUser } from "../../data/users_db";

interface IBlogCommentProps {
    comment: BlogCommentData,
    postComment: (text: string, parentCommentID: string) => void;
    voteOnBlog: (voteType: VoteType, commentID: string) => void;
}

const BlogComment: React.FunctionComponent<IBlogCommentProps> = (props:IBlogCommentProps): JSX.Element =>
{
    const {comment, postComment, voteOnBlog} = props;
    const [replyActive, setReplyActive] = useState(false);
    const [voteState, setVoteState] = useState<VoteType>(comment.userVote);
    const [totalVotes, setTotalVotes] = useState(comment.voteTotal);
    const classes = commentStyles();

    const children = comment.childComments.map((child) => {
        return <BlogComment comment={child} key={child.ID} postComment={postComment} voteOnBlog={voteOnBlog}/>
    });

    const replyToThisComment = (text: string) => {
        postComment(text, comment.ID);
    }

    const onClickReplyButton = (_event: any) => {
        setReplyActive((currState) => !currState);
    }

    const onClickVoteButton = (voteType: VoteType) => {
        return ((_event: any) => {
            setTotalVotes(() => {
                return comment.voteTotal + voteType;
            }); 

            setVoteState(() => {
                voteOnBlog(voteType, comment.ID);
                return voteType;
            })

        })
    }

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
                    {totalVotes}
                    {(voteState === VoteType.Up) ? <ThumbUpIcon className={classes.votingIcons} fontSize="small" onClick={onClickVoteButton(VoteType.None)}/> : <ThumbUpOutlinedIcon className={classes.votingIcons} fontSize="small" onClick={onClickVoteButton(VoteType.Up)}/> }
                    {(voteState === VoteType.Down) ? <ThumbDownIcon className={classes.votingIcons} fontSize="small" onClick={onClickVoteButton(VoteType.None)} /> : <ThumbDownOutlinedIcon className={classes.votingIcons} fontSize="small" onClick={onClickVoteButton(VoteType.Down)}/>}
                    <div className={classes.replyButton} onClick={onClickReplyButton}> Reply </div>
                </div>
                <div className={classes.replyArea}>
                    <PostComment active={replyActive} postComment={replyToThisComment} setActiveState={setReplyActive}/>
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
        cursor: "pointer",
        fontWeight: "bold",
        marginLeft: "30px",
        color: "lightgrey",
        display: "flex",  // this isn't working... tried to center the text but no luck.
        alignItems: "center",
        justifyContent: "center"
    },

    replyArea: {

    }
}); 

export default BlogComment;