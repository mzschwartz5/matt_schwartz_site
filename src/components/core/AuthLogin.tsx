import { Avatar, makeStyles, Theme } from "@material-ui/core";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { useRecoilValue } from "recoil";
import { auth } from "../../data/firebase";
import { activeUserAtom } from "../../data/users_db";
import Tooltip from "@mui/material/Tooltip";

interface IAuthLoginProps {

}

const AuthLogin: React.FunctionComponent<IAuthLoginProps> = (props: IAuthLoginProps) =>
{
    const activeUser = useRecoilValue(activeUserAtom);
    const provider = new GoogleAuthProvider();
    const classes = useLoginStyles(); 

    const onClickAvatar = () => {
        activeUser ? signOut(auth) : signInWithRedirect(auth, provider)
    }

    return(
        <Tooltip title={activeUser ? "Logout" : "Login"} arrow>
            <div onClick={onClickAvatar} style={{margin: "auto"}}>
                <Avatar src={activeUser ? activeUser.photoUrl : ""} className={classes.avatar}  imgProps={{referrerPolicy: "no-referrer"}} />
            </div>
        </Tooltip>
    );
}

const useLoginStyles = makeStyles((theme: Theme) => {
    return(
        {
            avatar: {
                cursor: "pointer",
                boxShadow: "1px 1px 4px black",
                "& :hover": {
                    opacity: ".8"
                }
            }
        }
    )
})

export default AuthLogin;