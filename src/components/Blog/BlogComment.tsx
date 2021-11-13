import { Avatar, makeStyles, Theme } from "@material-ui/core";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { BlogComment as BlogCommentData, VoteType} from "../../data/blogs_db";
import PostComment from "./PostComment";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { activeUserAtom } from "../../data/users_db";

interface IBlogCommentProps {
    comment: BlogCommentData,
    postComment: (text: string, parentCommentID: string) => void;
    editComment: (newText: string, commentID: string) => void;
    voteOnBlog: (voteType: VoteType, voteChange: number, commentID: string) => void;
}

const BlogComment: React.FunctionComponent<IBlogCommentProps> = (props:IBlogCommentProps): JSX.Element =>
{
    const {comment, postComment, editComment, voteOnBlog} = props;
    const [replyActive, setReplyActive] = useState(false);
    const [editingActive, setEditingActive] = useState(false);
    const [voteState, setVoteState] = useState<VoteType>(comment.userVote);
    const [totalVotes, setTotalVotes] = useState(comment.voteTotal);
    const [text, setText] = useState(comment.text);
    const activeUser = useRecoilValue(activeUserAtom);
    const classes = commentStyles();

    const children = comment.childComments.map((child) => {
        return <BlogComment comment={child} key={child.ID} postComment={postComment} editComment={editComment} voteOnBlog={voteOnBlog}/>
    });

    const editThisComment = (newText: string) => {
        editComment(newText, comment.ID);
        setText(newText);
    }

    const replyToThisComment = (text: string) => {
        postComment(text, comment.ID);
    }

    const onClickReplyButton = (_event: any) => {
        setReplyActive((currState) => !currState);
    }

    const onClickEditButton = (_event: any) => {
        setEditingActive((currState) => !currState);
    }

    const onClickVoteButton = (voteType: VoteType) => {
        return ((_event: any) => {
            try { // will fail if no user logged in. Handled in parent component.
                const voteChange = (voteType - voteState); 
                voteOnBlog(voteType, voteChange, comment.ID);
                setTotalVotes(totalVotes + voteChange); 
                setVoteState(voteType);
            }
            catch(e) {

            }
        })
    }

    return(
        <div className={classes.commentContainer}>
            {editingActive ? <PostComment defaultText={text} active={editingActive} postComment={editThisComment} setActiveState={setEditingActive}/> 
            : <div style={{display: "flex"}}>
                <div className={classes.avatar}>
                    <Avatar src={comment.userPhotoUrl} imgProps={{referrerPolicy: "no-referrer"}} />
                </div>
                <div className={classes.commentData}>
                    <div className={classes.metaDataSection}>
                        <span className={classes.userName}>{comment.userName}</span>
                        <span className={classes.date}>{comment.postDate.toDate().toDateString()}</span>
                        <span className={classes.edited}>{comment.edited ? "*edited" : ""}</span>
                    </div>
                    <div className={classes.textSection}>
                        {text}
                    </div>
                    <div className={classes.interactSection}>
                        {totalVotes}
                        {(voteState === VoteType.Up) ? <ThumbUpIcon className={classes.votingIcons} fontSize="small" onClick={onClickVoteButton(VoteType.None)}/> : <ThumbUpOutlinedIcon className={classes.votingIcons} fontSize="small" onClick={onClickVoteButton(VoteType.Up)}/> }
                        {(voteState === VoteType.Down) ? <ThumbDownIcon className={classes.votingIcons} fontSize="small" onClick={onClickVoteButton(VoteType.None)} /> : <ThumbDownOutlinedIcon className={classes.votingIcons} fontSize="small" onClick={onClickVoteButton(VoteType.Down)}/>}
                        <div className={classes.buttonContainer}>
                            <div onClick={onClickReplyButton} className={classes.button}> Reply </div>
                            {(activeUser?.userId === comment.userId) ? <div onClick={onClickEditButton} className={classes.button}> Edit </div> : ""} 
                        </div>
                    </div>
                    <PostComment active={replyActive} postComment={replyToThisComment} setActiveState={setReplyActive}/>
                </div>
            </div>}
            {children}
        </div>
    );
}

const commentStyles = makeStyles((theme:Theme) => {

    return(
        {
            commentContainer: {
                margin: "10px 0px 15px 50px",
                [theme.breakpoints.down("xs")]: {
                    marginLeft: "0px"
                }
            },
        
            avatar: {
                width: "auto",
                display: "inline-block",
                verticalAlign: "top",
                "& .MuiAvatar-img": {
                    width: "100%"
                }
            },
        
            commentData: {
                display: "inline-block",
                marginLeft: "10px",
                flex: 1
            },
        
            userName: {
                color: "lightblue",
                margin: "0px 5px 0px 0px",
                fontWeight: "bold"
            },
        
            date: {
                color: "lightgray",
                fontWeight: "lighter",
                marginRight: "10px"
            },
        
            edited: {
                color: "lightgray",
                fontWeight: "lighter",
                fontStyle: "italic"
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
        
            buttonContainer: {
                cursor: "pointer",
                fontWeight: "bold",
                marginLeft: "15px",
                color: "lightgrey",
                display: "flex",  
            },
        
            button: {
                marginLeft: "10px"
            },
        }
    )
}); 

export default BlogComment;