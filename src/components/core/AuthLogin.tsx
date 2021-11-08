import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../../data/firebase";
import PageLink from "./PageLink";

interface IAuthLoginProps {
    className?: string,
    id?: string
}

const AuthLogin: React.FunctionComponent<IAuthLoginProps> = (props: IAuthLoginProps) =>
{
    const {className = "", id} = props;
    const provider = new GoogleAuthProvider();

    const onClickLogin = () => {
        signInWithRedirect(auth, provider);
    }

    return(
        <PageLink onClick={onClickLogin} text={"Login"} linkTo={"/"} className={className} id={id}/>
    );
}

export default AuthLogin;