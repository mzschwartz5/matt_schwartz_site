import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import LinkGroup from "./LinkGroup";

interface IFooterProps {

}

const Footer: React.FunctionComponent<IFooterProps> = (props:IFooterProps): JSX.Element =>
{

    const classes = footerStyles();
    const date = new Date();
    const year = date.getFullYear();

    return(
        <footer className={classes.footerContainer}>
            <div className={classes.footerContent}>
                <div>Matthew Schwartz - {year}</div>
                <LinkGroup/>
            </div>
        </footer>
    );
}

const footerStyles = makeStyles((theme: Theme) => {
    return({
        footerContainer: {
            // backgroundColor: "rgb(31 34 40)",
            backgroundColor: theme.palette.tertiary.main,
            height: "10vh"
        },

        footerContent: {
            textAlign: "center",
            position: "relative",
            top: "25%"}
    });
});

export default Footer;