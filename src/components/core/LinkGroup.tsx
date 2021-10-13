import IconLink from "./IconLink";
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import DescriptionIcon from '@material-ui/icons/Description';

const LinkGroup: React.FunctionComponent = () =>
{
    return(
    <>
        <IconLink image={<EmailIcon style={{color:"white"}} />} altText="Email address link" linkTo="mailto: mzschwartz5@gmail.com" />
        <IconLink image={<GitHubIcon style={{color:"white"}}/>} altText="GitHub link" linkTo="https://github.com/mzschwartz5" />
        <IconLink image={<LinkedInIcon style={{color:"white"}}/>} altText="LinkedIn link" linkTo="https://www.linkedin.com/in/matthew-schwartz-37019016b/" />
        <IconLink image={<DescriptionIcon style={{color:"white"}}/>} altText="Resume" linkTo="../../assets/file/Resume2021.pdf" /> 
    </>
    );
}

export default LinkGroup;