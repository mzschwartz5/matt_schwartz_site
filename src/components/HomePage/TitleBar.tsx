import AppBar from '@material-ui/core/AppBar';
import { Slide, useScrollTrigger } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SectionHeader from '../core/SectionHeader';
import PageLink from '../core/PageLink';


const TitleBar: React.FunctionComponent = (): JSX.Element =>
{
    const trigger = useScrollTrigger();
    const classes = useStyles();

    return (
    <Slide appear={false} direction="down" in={!trigger}>
        <AppBar className={classes.root} position="sticky">
            <SectionHeader headerText={"Matthew Schwartz"}/>
            <div className={classes.pageLinkDiv}>
                <PageLink text={"Home"} linkTo={"/"} />
                <PageLink text={"Projects"} linkTo={"/project_gallery"}/>
                <PageLink text={"Blog"} linkTo={"/blog"} />
            </div>
        </AppBar>
    </Slide>
    );
}

const useStyles = makeStyles({
    root: {
        flexDirection: 'row',
    },

    pageLinkDiv: {
        display: "flex",
        flexGrow: 1,
        margin: "auto",
        justifyContent: "space-evenly"
    }
});



export default TitleBar;