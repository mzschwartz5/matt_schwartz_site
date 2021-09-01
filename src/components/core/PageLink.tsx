import { Link } from "react-router-dom";

interface IPageLink {
    text: string;
    linkTo: string;
    overrideClass?: string;
}

const PageLink: React.FunctionComponent<IPageLink> = (props:IPageLink): JSX.Element =>
{
    const {text,linkTo,overrideClass} = props;

    return(
        <Link to={linkTo} className={overrideClass} style={{color: 'white', textDecoration: 'none'}}>
            {text}
        </Link>
    );
}

export default PageLink;