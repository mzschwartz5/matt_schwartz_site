import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { useRecoilValue } from "recoil";
import { auth } from "../../data/firebase";
import { activeUserAtom } from "../../data/users_db";
import PageLink from "./PageLink";

interface IAuthLoginProps {
    className?: string,
    id?: string
}

const AuthLogin: React.FunctionComponent<IAuthLoginProps> = (props: IAuthLoginProps) =>
{
    const {className = "", id} = props;
    const activeUser = useRecoilValue(activeUserAtom);
    const provider = new GoogleAuthProvider();

    const onClickLogin = () => {
        signInWithRedirect(auth, provider);
    }

    const onClickLogout = () => {
        signOut(auth);
    }

    return(
        <>
            {activeUser ? 
                <PageLink onClick={onClickLogout} text="Logout" linkTo="/" className={className} id={id}/> : 
                <PageLink onClick={onClickLogin} text="Login" linkTo="/" className={className} id={id}/>
            }
        </>
    );
}

export default AuthLogin;