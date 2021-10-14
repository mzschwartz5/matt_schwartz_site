import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";

interface IPageLink {
    text: string;
    linkTo: string;
    onClick?: () => void;
    overrideClass?: string;
}

const PageLink: React.FunctionComponent<IPageLink> = (props:IPageLink): JSX.Element =>
{
    const {text,linkTo,onClick,overrideClass} = props;
    const classes = useLinkStyles();

    return(
        <NavLink exact onClick={onClick} activeClassName={classes.activeLink} to={linkTo} className={overrideClass ? overrideClass : classes.baseLink }>
            {text}
        </NavLink>
    );
}

const useLinkStyles = makeStyles({
    activeLink: {
        backgroundColor: "rgb(198 198 255 / 20%)",
        borderRadius: "5px",
    },

    baseLink: {
        color: "white",
        textDecoration: "none",
        padding: "5px 15px 5px 15px",
        fontSize: "18px",

        "&:hover": {
            backgroundColor: "rgb(198 198 255 / 10%)",
            borderRadius: "5px",
        }
    },


});

export default PageLink;