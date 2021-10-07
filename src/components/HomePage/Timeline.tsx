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
import RiceImagePath from '../../assets/images/homepage/with_friends_at_rice.jpg';
import MarathonImagePath from '../../assets/images/homepage/marathon_pic.jpg';
import LinkedInImagePath from '../../assets/images/homepage/linkedin_image.jpg';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

const Timeline: React.FunctionComponent = () =>
{
    const imageText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

    return(
        <MuiTimeline align="alternate">
            <TimelineItemWrapper imagePath={LinkedInImagePath} imageAltText="LinkedIn" imageDesc={imageText} imageTitle="Education" DotIcon={SchoolIcon}/>
            <TimelineItemWrapper imagePath={RiceImagePath} imageAltText="Rice University" imageDesc={imageText} imageTitle="Work Experience" DotIcon={WorkIcon}/>
            <TimelineItemWrapper imagePath={MarathonImagePath} imageAltText="Half Marathon 2019" imageDesc={imageText} imageTitle="Personal Projects" DotIcon={HomeWorkIcon}/>
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
    const entry = useIntersectionObserver(ref, {threshold: thresholds})             
    const classes = useTimelineItemStyles({intersectionRatio: Number(entry?.intersectionRatio)});

    return(
        <TimelineItem className={classes.timelineItemContent}>
            <TimelineContent className={classes.timelineItemText}>
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
                <TimelineDot className={classes.timelineDot} variant="outlined" color='primary'>
                    <DotIcon/>
                </TimelineDot>
                <TimelineConnector className={classes.timelineConnector}/>
            </TimelineSeparator>
            <TimelineOppositeContent>
                <p>{imageTitle}</p>
                <Card className={classes.card + ' ' + classes.cardOppositeContent}>
                    <CardContent>
                        {imageDesc}
                    </CardContent>  
                </Card>
            </TimelineOppositeContent>
        </TimelineItem>
    );
}

const useTimelineItemStyles = makeStyles<Theme, {intersectionRatio: number}>({

    timelineItemText: {
        textAlign: 'left',  
    },

    timelineItemContent: { 
        marginLeft: '10px',
        marginRight: '10px'
    },

    cardHeight: {
        height: '100vh',
    },

    card: ({intersectionRatio}) => ({
        marginTop: '20px',
        marginLeft: '10px',
        marginRight: '10px',
        opacity: (Math.pow(intersectionRatio,1.1)),
    }),

    cardOppositeContent: {
        position: 'relative',
        top: '25%'
    },

    timelineDot: {
        color: '#4267B2'
    },

    timelineConnector: {
        backgroundColor: '#4267B2'
    },

});


export default Timeline;