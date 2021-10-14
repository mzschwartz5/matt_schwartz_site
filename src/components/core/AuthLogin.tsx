import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../../data/firebase";
import PageLink from "./PageLink";

const AuthLogin: React.FunctionComponent = () =>
{
    const provider = new GoogleAuthProvider();

    const onClickLogin = () => {
        signInWithRedirect(auth, provider);
    }

    return(
        <PageLink onClick={onClickLogin} text={"Login"} linkTo={"/"} />
    );
}

export default AuthLogin;