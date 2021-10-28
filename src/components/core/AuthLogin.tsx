import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useRouteMatch } from "react-router-dom";
import { auth } from "../../data/firebase";
import PageLink from "./PageLink";

const AuthLogin: React.FunctionComponent = () =>
{
    const provider = new GoogleAuthProvider();
    const routeMatch = useRouteMatch();

    const onClickLogin = () => {
        signInWithRedirect(auth, provider);
    }

    return(
        <PageLink onClick={onClickLogin} text={"Login"} linkTo={routeMatch.path} />
    );
}

export default AuthLogin;