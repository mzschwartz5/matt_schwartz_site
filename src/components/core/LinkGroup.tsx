import IconLink from "./IconLink";
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import DescriptionIcon from '@material-ui/icons/Description';
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import Resume2021 from '../../assets/files/Resume2021.pdf';

const LinkGroup: React.FunctionComponent = () =>
{
    const linkStyles = useLinkGroupStyles();

    return(
    <>
        <IconLink image={<EmailIcon className={linkStyles.icon} />} altText="Email address link" linkTo="mailto: mzschwartz5@gmail.com" />
        <IconLink image={<GitHubIcon className={linkStyles.icon}/>} altText="GitHub link" linkTo="https://github.com/mzschwartz5" />
        <IconLink image={<LinkedInIcon className={linkStyles.icon}/>} altText="LinkedIn link" linkTo="https://www.linkedin.com/in/matthew-schwartz-37019016b/" />
        <IconLink image={<DescriptionIcon className={linkStyles.icon}/>} altText="Resume" linkTo={Resume2021} /> 
    </>
    );
}

const useLinkGroupStyles = makeStyles((theme:Theme) => {

    return(
        {
            icon: {
                color: theme.palette.paper.main
            }
        }
    );
})

export default LinkGroup;