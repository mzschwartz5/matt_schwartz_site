import { Avatar, Button, makeStyles, Snackbar, TextField } from "@material-ui/core";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { activeUserAtom } from "../../data/users_db";

interface IPostCommentProps {
    active: boolean,
    postComment: (text: string) => void,
    setActiveState: (value: React.SetStateAction<boolean>) => void,
}

const PostComment: React.FunctionComponent<IPostCommentProps> = (props:IPostCommentProps): JSX.Element =>
{
    const {active, postComment, setActiveState} = props;
    const [commentText, setCommentText] = useState("");
    const [successMessageActive, setSuccessMessageActive] = useState(false);
    const activeUser = useRecoilValue(activeUserAtom);
    const classes = usePostStyles(); 

    const onInputChange = (event: any) => {
        setCommentText(event.target.value);
    } 

    const onClickReply = (_event: any) => {
        postComment(commentText);
        setSuccessMessageActive(true);
        clearReply();
    }

    const onClickCancel = (_event: any) => {
        clearReply();
    }

    const clearReply = () => {
        setCommentText("");
        setActiveState(false);
    }

    const onCloseSnackbar = () => {
        setSuccessMessageActive(false);
    }

    return(
        <>
            <div className={classes.postContainer} style={active ? {} : {display: "none"}}>
                <div className={classes.avatar}>
                    <Avatar src={activeUser.photoUrl} imgProps={{referrerPolicy: "no-referrer"}} />
                </div>
                <div className={classes.interactions}>
                    <TextField multiline variant="filled" value={commentText} className={classes.textField} placeholder="Add a comment..." onChange={onInputChange}/>
                    <Button onClick={onClickReply} variant="outlined" size="small" className={classes.buttons}>Reply</Button>
                    <Button onClick={onClickCancel} variant="outlined" size="small" className={classes.buttons} >Cancel</Button>
                </div>
            </div>
            <Snackbar open={successMessageActive} autoHideDuration={6000} message="Post in progress. Please refresh to see changes" onClose={onCloseSnackbar}/>
        </>
    );
}

const usePostStyles = makeStyles({
    postContainer: {
        marginTop: "15px"
    },

    avatar: {
        width: "auto",
        display: "inline-block",
        verticalAlign: "top",
        marginRight: "15px"
    },

    interactions: {
        display: "inline-block",
    },

    textField: {
        width: "30vw",
        "& .MuiFilledInput-multiline": {
            color: "white"
        }
    },

    buttons: {
        color: "white",
        borderColor: "white",
        marginLeft: "5px",
        "&:hover": {
            backgroundColor: "grey"
        }
    }
})

export default PostComment;