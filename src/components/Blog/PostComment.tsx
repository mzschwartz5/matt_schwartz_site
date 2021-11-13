import { Avatar, Button, makeStyles, Snackbar, TextField } from "@material-ui/core";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { activeUserAtom } from "../../data/users_db";

interface IPostCommentProps {
    active: boolean,
    postComment: (text: string) => void,
    setActiveState: (value: boolean) => void,
    defaultText?: string,
    className?: string,
}

const PostComment: React.FunctionComponent<IPostCommentProps> = (props:IPostCommentProps): JSX.Element =>
{
    const {active, postComment, setActiveState, defaultText ="", className = ""} = props;
    const [commentText, setCommentText] = useState(defaultText);
    const [successMessageActive, setSuccessMessageActive] = useState(false);
    const activeUser = useRecoilValue(activeUserAtom);
    const classes = usePostStyles(); 

    const onInputChange = (event: any) => {
        setCommentText(event.target.value);
    } 

    const onClickReply = (_event: any) => {
        try {
            if (commentText === "") return;
            postComment(commentText);
            setSuccessMessageActive(true);
            clearReply();    
        }
        catch(e) {

        }
    }

    const onClickClear = (_event: any) => {
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
            <div className={classes.postContainer + " " + className} style={active ? {} : {display: "none"}}>
                <div className={classes.avatar}>
                    <Avatar src={activeUser ? activeUser.photoUrl : ""} imgProps={{referrerPolicy: "no-referrer"}} />
                </div>
                <TextField multiline variant="filled" value={commentText} className={classes.textField} placeholder="Add a comment..." onChange={onInputChange}/>
                <div className={classes.interactButtons}>
                    <Button onClick={onClickReply} variant="outlined" size="small" className={classes.buttons}>Reply</Button>
                    <Button onClick={onClickClear} variant="outlined" size="small" className={classes.buttons}>Clear</Button>    
                </div>
            </div>
            <Snackbar open={successMessageActive} autoHideDuration={6000} message="Post in progress. Please refresh to see changes" onClose={onCloseSnackbar}/>
        </>
    );
}

const usePostStyles = makeStyles({
    postContainer: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap"
    },

    avatar: {
        width: "auto",
        display: "inline-block",
        verticalAlign: "top",
        marginRight: "15px",
        "& .MuiAvatar-img": {
            width: "100%"
        }
    },

    textField: {
        flex: "50%",
        "& .MuiFilledInput-multiline": {
            color: "white",
            padding: "20px 12px 10px",
            marginTop: "4px",
            marginBottom: "4px"
        },
    },

    buttons: {
        color: "white",
        borderColor: "white",
        marginLeft: "5px",
        "&:hover": {
            backgroundColor: "grey"
        },
    },

    interactButtons: {
        marginLeft: "auto",
        marginTop: "5px"
    }
})

export default PostComment;