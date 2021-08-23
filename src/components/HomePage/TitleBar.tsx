import AppBar from '@material-ui/core/AppBar';
import { Slide, useScrollTrigger } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SectionHeader from '../core/SectionHeader';
import PageLink from '../core/PageLink';
import IconLink from '../core/IconLink';
import EmailIconPath from '../../assets/icons/email_icon.png';
import GithubIconPath from '../../assets/icons/github_logo.png';
import LinkedInIconPath from '../../assets/icons/linkedin_logo.png';
import ResumeIconPath from '../../assets/icons/resume_icon.png';

const TitleBar: React.FunctionComponent = (): JSX.Element =>
{
    const trigger = useScrollTrigger();
    const classes = useStyles();

    return (
    <Slide appear={false} direction="down" in={!trigger}>
        <AppBar className={classes.root} position="sticky">
            <div className={classes.headerDiv}>
                <SectionHeader headerText="Matthew Schwartz" overrideClass="blah"/>
                <IconLink imagePath={EmailIconPath} altText="Email address link" linkTo="mailto: mzschwartz5@gmail.com" />
                <IconLink imagePath={GithubIconPath} altText="GitHub link" linkTo="https://github.com/mzschwartz5" />
                <IconLink imagePath={LinkedInIconPath} altText="LinkedIn link" linkTo="https://www.linkedin.com/in/matthew-schwartz-37019016b/" />
                <IconLink imagePath={ResumeIconPath} altText="Resume" linkTo="../../assets/file/Resume2021.pdf" /> 
            </div>
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
        opacity: .9,
        backgroundImage: 'linear-gradient(to bottom right, #4267B2, #5973ff)'
    },

    pageLinkDiv: {
        display: "flex",
        flexGrow: 1,
        margin: "auto",
        justifyContent: "space-evenly"
    },

    headerDiv: {
        display: "flex",
        flexGrow: 2,
    },
});



export default TitleBar;