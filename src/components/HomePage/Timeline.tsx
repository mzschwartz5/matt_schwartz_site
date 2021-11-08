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
import { useMemo, useRef } from "react";
import { Theme } from '@material-ui/core';
import WorkImagePath from '../../assets/images/homepage/Epic-exterior.jpg';
import ProjectImagePath from '../../assets/images/homepage/projects_image.png';
import LinkedInImagePath from '../../assets/images/homepage/linkedin_image.jpg';
import BikeImagePath from "../../assets/images/homepage/bike_image.jpg";
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import HelpIcon from '@material-ui/icons/Help';
import { educationText, workExperienceText, personalProjectText, whatsNextText } from '../../data/static_content';

const Timeline: React.FunctionComponent = () =>
{
    const classes = useTimelineRootStyles();

    return(
        <MuiTimeline align="alternate" className={classes.timelineRoot}>
            <TimelineItemWrapper imagePath={LinkedInImagePath} imageAltText="LinkedIn" imageDesc={educationText} imageTitle="Education" DotIcon={SchoolIcon}/>
            <TimelineItemWrapper imagePath={WorkImagePath} imageAltText="Rice University" imageDesc={workExperienceText} imageTitle="Work Experience" DotIcon={WorkIcon}/>
            <TimelineItemWrapper imagePath={ProjectImagePath} imageAltText="Half Marathon 2019" imageDesc={personalProjectText} imageTitle="Personal Projects" DotIcon={HomeWorkIcon}/>
            <TimelineItemWrapper imagePath={BikeImagePath} imageAltText="LinkedIn" imageDesc={whatsNextText} imageTitle="What's Next?" DotIcon={HelpIcon}/>
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
    const ref = useRef(null); // becomes ref to the element to fade
    const thresholds = useMemo(() => Array(100).fill(0.01).map((val,idx) => (val += 0.01*idx)), []);
    const entry = useIntersectionObserver(ref, {threshold: thresholds});             
    const classes = useTimelineItemStyles({intersectionRatio: Number(entry?.intersectionRatio)});

    return(
        <TimelineItem className={classes.timelineItemContent} >
            <TimelineContent className={classes.timelineItemImage}>
                <Card className={classes.card}>
                    <CardMedia
                        ref={ref} 
                        image={imagePath}
                        title={imageAltText}
                        className={classes.cardHeight}
                    />
                </Card>
            </TimelineContent>
            <TimelineSeparator>
                <TimelineConnector className={classes.timelineConnector}/>
                <TimelineDot className={classes.timelineDot} variant="outlined">
                    <DotIcon/>
                </TimelineDot>
                <TimelineConnector className={classes.timelineConnector}/>
            </TimelineSeparator>
            <TimelineOppositeContent className={classes.timelineOppositeContent}>
                <div className={Number(entry?.intersectionRatio) >= 0.5 ? "cardTextAnimated" : "cardText"}  style={{marginTop: "-52px"}}> {/*change this inline style later*/}
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
        timelineItemImage: {
            textAlign: 'left',
        },

        // All alternating styles applied to the timeline are here
        timelineItemContent: { 
            overflowX: "hidden",
            "&:nth-child(even)": {
                backgroundColor: secondaryColor,
                "& .imageTitle": {
                    textAlign: "right",
                    color: accentColor
                },
                "& .cardTextAnimated": {
                    transitionDuration: "600ms",
                    transitionTimingFunction: "cubic-bezier(0.33, 1, 0.68, 1)",
                    transitionDelay: "100ms"
                },
                "& .cardText": {
                    transform: "translate(-105%)",
                }
            },
            "&:nth-child(odd)": {
                "& .imageTitle": {
                    textAlign: "left",
                    color: accentColor
                },
                "& .cardTextAnimated": {        
                    transitionDuration: "600ms",
                    transitionTimingFunction: "cubic-bezier(0.33, 1, 0.68, 1)",
                    transitionDelay: "100ms"
                },
                "& .cardText": {
                    transform: "translate(105%)",
                }
            }
        },

        cardHeight: {
            height: '95vh',
        },

        card: ({intersectionRatio}) => ({
            marginTop: '20px',
            marginLeft: '10px',
            marginRight: '10px',
            marginBottom: '20px',
            opacity: Math.sin(intersectionRatio * (Math.PI / 2)),
            borderRadius: "10px"
        }),

        timelineOppositeContent: {
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
        },

        cardOppositeContent: ({intersectionRatio}) => ({
            marginLeft: '10px',
            marginRight: '10px',
            opacity: Math.sin(intersectionRatio * (Math.PI / 2)),
            alignSelf: "center",
            backgroundColor: paperColor,
            textAlign: "left",
            padding: "0px 12px 0px 12px",
            "& p": {
                margin: "8px 0px 8px 0px",
                lineHeight: "1.6em",
                fontSize: "17px",
                textIndent: "35px"
            }
        }),

        timelineDot: {
            color: paperColor ,
            borderColor: tertiaryColor ,
        },

        timelineConnector: {
            backgroundColor: tertiaryColor,
            width: "4px",
        },
    });   
});


export default Timeline;