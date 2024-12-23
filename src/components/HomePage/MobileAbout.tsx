import { Avatar, Theme, makeStyles, Card, CardContent } from "@material-ui/core";
import EpicImagePath from '../../assets/images/homepage/Epic-exterior.jpg';
import AmazonImagePath from '../../assets/images/homepage/amazon.png';
import LinkedInImagePath from '../../assets/images/homepage/linkedin_image.jpg';
import UPennImagePath from '../../assets/images/homepage/UPennImage.png';
import RiceImagePath from '../../assets/images/homepage/riceuniv.png';
import { riceText, epicWorkExperienceText, amazonWorkExperienceText, uPennText, aboutMeText } from '../../data/static_content';

const MobileAbout: React.FunctionComponent = () =>
{

    return(
        <>
            <AboutSection src={LinkedInImagePath} sectionTitle="About me" imageDesc={aboutMeText}/>
            <AboutSection src={UPennImagePath} sectionTitle="University of Pennsylvania" imageDesc={uPennText}/>
            <AboutSection src={AmazonImagePath} sectionTitle="Amazon Web Services" imageDesc={amazonWorkExperienceText}/>
            <AboutSection src={EpicImagePath} sectionTitle="Epic" imageDesc={epicWorkExperienceText}/>
            <AboutSection src={RiceImagePath} sectionTitle="Rice University" imageDesc={riceText}/>
        </>
    );
}

interface IAboutSectionProps {
    src: string,
    sectionTitle: string,
    imageDesc: string
}

const AboutSection: React.FunctionComponent<IAboutSectionProps> = (props: IAboutSectionProps) => {

    const {src, sectionTitle, imageDesc} = props;
    const classes = useAboutSectionStyles();

    return(
        <>
            <h2 className={classes.title} >{sectionTitle}</h2>
            <Avatar src={src} className={classes.avatar} />
            <Card className={classes.description}>
                <CardContent >
                    {imageDesc.split('\n').map(str => <p>{str}</p>)}
                </CardContent>
            </Card>
        </>
    );
}

const useAboutSectionStyles = makeStyles((theme:Theme) => {
    return({
        avatar: {
            height: "75vw",
            width: "75vw",
            marginTop: "15px",
            marginLeft: "auto",
            marginRight: "auto"
        },

        title: {
            color: theme.palette.paper.main,
            textAlign: "center",
        },

        description: {
            "& .MuiCardContent-root": {
                padding: "5px 25px 5px 25px",
            },
            margin: "25px 30px 75px 30px"
        },

        sectionBreak: {
            width: "75vw",
            marginTop: "30px",
            marginBottom: "30px"
        }
    })
})

export default MobileAbout;