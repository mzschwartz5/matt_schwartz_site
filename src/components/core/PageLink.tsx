import { makeStyles, Theme } from "@material-ui/core";
import { NavLink } from "react-router-dom";

interface IPageLink {
    text: string;
    linkTo: string;
    onClick?: () => void;
    className?: string;
    id?: string;
}

const PageLink: React.FunctionComponent<IPageLink> = (props:IPageLink): JSX.Element =>
{
    const {text,linkTo,onClick,className = "", id = ""} = props;
    const classes = useLinkStyles();

    return(
        <NavLink exact id={id} onClick={onClick} activeClassName={classes.activeLink} to={linkTo} className={classes.baseLink + " " + className}>
            {text}
        </NavLink>
    );
}

const useLinkStyles = makeStyles((theme: Theme) => {
    
    return({
        activeLink: {
            backgroundColor: "rgb(198 198 255 / 20%)",
            borderRadius: "5px",
        },
    
        baseLink: {
            textDecoration: "none",
            padding: "5px 15px 5px 15px",
            fontSize: "18px",
            color: theme.palette.paper.main,
            borderRadius: "5px",
    
            "&:hover": {
                backgroundColor: "rgb(198 198 255 / 10%)",
            }
        },
    })


});

export default PageLink;