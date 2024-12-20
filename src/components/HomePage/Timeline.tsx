import MuiTimeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import { TimelineOppositeContent } from '@material-ui/lab';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from "@material-ui/core/styles";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { useState, useMemo, useRef } from "react";
import { Theme } from '@material-ui/core';
import EpicImagePath from '../../assets/images/homepage/Epic-exterior.jpg';
import AmazonImagePath from '../../assets/images/homepage/amazon.png';
import ProjectImagePath from '../../assets/images/homepage/projects_image.png';
import LinkedInImagePath from '../../assets/images/homepage/linkedin_image.jpg';
import BikeImagePath from "../../assets/images/homepage/bike_image.jpg";
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import HelpIcon from '@material-ui/icons/Help';
import { educationText, epicWorkExperienceText, amazonWorkExperienceText, personalProjectText, whatsNextText } from '../../data/static_content';

const Timeline: React.FunctionComponent = () =>
{
    const classes = useTimelineRootStyles();

    return(
        <MuiTimeline align="alternate" className={classes.timelineRoot}>
            <TimelineItemWrapper imagePath={LinkedInImagePath} imageAltText="LinkedIn" imageDesc={educationText} imageTitle="Education" DotIcon={SchoolIcon}/>
            <TimelineItemWrapper imagePath={EpicImagePath} imageAltText="Epic" imageDesc={epicWorkExperienceText} imageTitle="Epic" DotIcon={WorkIcon}/>
            <TimelineItemWrapper imagePath={AmazonImagePath} imageAltText="Amazon" imageDesc={amazonWorkExperienceText} imageTitle="Amazon Web Services" DotIcon={WorkIcon}/>
            <TimelineItemWrapper imagePath={ProjectImagePath} imageAltText="Bejewel3d" imageDesc={personalProjectText} imageTitle="Personal Projects" DotIcon={HomeWorkIcon}/>
            <TimelineItemWrapper imagePath={BikeImagePath} imageAltText="Biking" imageDesc={whatsNextText} imageTitle="What's Next?" DotIcon={HelpIcon}/>
        </MuiTimeline>
    );
}

interface ITimelineItemWrapperProps {
    imagePath: string,
    imageAltText: string,
    imageDesc: string,
    imageTitle: string,
    DotIcon: React.FunctionComponent,
}

const TimelineItemWrapper: React.FunctionComponent<ITimelineItemWrapperProps> = (props: ITimelineItemWrapperProps) =>
{
    const {imagePath, imageAltText, imageDesc, imageTitle, DotIcon} = props;

    // When an observed element passes a threshold of on-screen visibility, update its opacity accordingly for fade effect.
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null); // becomes ref to the element to fade
    const thresholds = useMemo(() => Array(100).fill(0.01).map((val,idx) => (val += 0.01*idx)), []);
    const entry = useIntersectionObserver(ref, {threshold: thresholds});             
    const classes = useTimelineItemStyles({intersectionRatio: Number(entry?.intersectionRatio)});

    if (Number(entry?.intersectionRatio) >= 0.5 && !hasAnimated) {
        setHasAnimated(true);
    }

    return(
        <TimelineItem className={classes.timelineItem} >
            <TimelineContent className="timelineContent">
                <Card className={classes.card}>
                    <CardMedia
                        ref={ref} 
                        image={imagePath}
                        title={imageAltText}
                        className={classes.cardMedia}
                    />
                </Card>
            </TimelineContent>
            <TimelineSeparator className={classes.timelineSeparator}>
                <TimelineConnector className={classes.timelineConnector}/>
                <TimelineDot className={classes.timelineDot} variant="outlined">
                    <DotIcon/>
                </TimelineDot>
                <TimelineConnector className={classes.timelineConnector}/>
            </TimelineSeparator>
            <TimelineOppositeContent className={classes.timelineOppositeContent}>
                <div className={hasAnimated ? "cardTextAnimated" : "cardText"}>
                    <h2 className="imageTitle">{imageTitle}</h2>
                    <Card className={classes.cardOppositeContent}>
                        <CardContent>
                            {imageDesc.split('\n').map(str => <p>{str}</p>)}
                        </CardContent>  
                    </Card>
                </div>
            </TimelineOppositeContent>
        </TimelineItem>
    );
}

const useTimelineRootStyles = makeStyles({
    timelineRoot: {
        margin: "0px",
        padding: "0px",
    }
});

const useTimelineItemStyles = makeStyles<Theme, {intersectionRatio: number}>((theme:Theme) => {
    const paperColor = theme.palette.paper.main;
    const secondaryColor = theme.palette.secondary.main;
    const tertiaryColor = theme.palette.tertiary.main;
    const accentColor = theme.palette.accent.main;

    return({
        // All alternating styles applied to the timeline are here
        timelineItem: {
            height: "75vh",
            overflowX: "hidden",
            overflowY: "hidden",
            "&:nth-child(even)": {
                backgroundColor: secondaryColor,
                "& .cardTextAnimated": {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    transitionDuration: "600ms",
                    transitionTimingFunction: "cubic-bezier(0.33, 1, 0.68, 1)",
                    transitionDelay: "100ms"
                },
                "& .cardText": {
                    transform: "translate(-105%)",
                },
                "& .timelineContent": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                },
                "& .imageTitle": {
                    marginLeft: "10px",
                    marginRight: "10px",
                    textAlign: "right",
                    color: accentColor,
                }
            },
            "&:nth-child(odd)": {
                "& .cardTextAnimated": {        
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    transitionDuration: "600ms",
                    transitionTimingFunction: "cubic-bezier(0.33, 1, 0.68, 1)",
                    transitionDelay: "100ms"
                },
                "& .cardText": {
                    transform: "translate(105%)",
                },
                "& .timelineContent": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                },
                "& .imageTitle": {
                    marginLeft: "10px",
                    marginRight: "10px",
                    textAlign: "left",
                    color: accentColor,
                }
            },
        },

        cardMedia: {
            height: '100%',
        },

        card: ({intersectionRatio}) => ({
            opacity: Math.sin(intersectionRatio * (Math.PI / 2)),
            borderRadius: "5px",
            width: "65%",
            height: '90%',
        }),

        timelineOppositeContent: {
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
        },

        cardOppositeContent: ({intersectionRatio}) => ({
            opacity: Math.sin(intersectionRatio * (Math.PI / 2)),
            backgroundColor: paperColor,
            textAlign: "left",
            padding: "0px 12px 0px 12px",
            "& p": {
                margin: "8px 0px 8px 0px",
                lineHeight: "1.6em",
                fontSize: "17px",
                textIndent: "35px"
            },
            width: "80%",
        }),

        timelineDot: {
            color: paperColor,
            borderColor: tertiaryColor,
        },

        timelineConnector: {
            backgroundColor: tertiaryColor,
            width: "4px",
        },

        timelineSeparator: {
            padding: "0px 10px 0px 10px",
        }
    });   
});


export default Timeline;