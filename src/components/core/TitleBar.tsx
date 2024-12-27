import { useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { Slide, useScrollTrigger } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import SectionHeader from './SectionHeader';
import PageLink from './PageLink';
import LinkGroup from './LinkGroup';
import AuthLogin from './AuthLogin';

const TitleBar: React.FunctionComponent = (): JSX.Element =>
{
    const trigger = useScrollTrigger();
    const classes = useStyles();
    const location = useLocation();

    return (
    <Slide appear={false} direction="down" in={!trigger}>
        <AppBar className={classes.root} position="sticky">
            <div className={classes.headerDiv}>
                <SectionHeader headerText="Matthew Schwartz" overrideClass={classes.nameDiv}/>
                <div className={classes.divider}></div>
                <LinkGroup/> 
            </div>
            <div className={classes.pageLinkDiv}>
                <PageLink text={"Home"} linkTo={"/"} className={classes.pageLink}/>
                <PageLink text={"Projects"} linkTo={"/project_gallery"} className={classes.pageLink}/>
                <PageLink text={"Blog"} linkTo={"/blog"} className={classes.pageLink}/>
                {location.pathname === '/blog' && <AuthLogin/>}
            </div>
        </AppBar>
    </Slide>
    );
}

const useStyles = makeStyles((theme: Theme) => {
    return({
        root: {
            flexDirection: 'row',
            backgroundColor: theme.palette.tertiary.main,
            color: theme.palette.paper.main,
            boxShadow: "none",
            minHeight: "5.5vh"
        },

        pageLinkDiv: {
            display: "flex",
            flexGrow: 1,
            marginRight: "10px",
            justifyContent: "space-evenly",
            [theme.breakpoints.down("xs")]: {
                margin: "10px 0px"
            },
        },

        pageLink: {
            margin:"auto"
        },

        headerDiv: {
            [theme.breakpoints.down("xs")]: {
                display: "none",
            },
            display: "flex",
            flexGrow: 15,
        },

        divider: {
            borderLeft: "solid 1px " + theme.palette.accent.main,
            margin: '10px 5px 10px 0px'
        },

        nameDiv: {
            alignSelf: "center",
            margin: "3px 10px 3px 15px",
            color: theme.palette.accent.main
        }
    });
});



export default TitleBar;