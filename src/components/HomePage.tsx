import SiteHeader from "./SiteHeader"
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from "@material-ui/core/styles";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { useRef } from "react";
import { Theme } from "@material-ui/core";

/*
    Main page - Container for whole site.
    In the future, will add routing to control when each tab renders and to be able to link to a specific tab.
*/
const HomePage: React.FunctionComponent = (): JSX.Element =>
{
    return(
    <>
        <Timeline>
            <TimelineItemWrapper/>
            <TimelineItemWrapper/>
            <TimelineItemWrapper/>
        </Timeline>
    </>
    );
}

const TimelineItemWrapper: React.FunctionComponent = () =>
{
    const ref = useRef(null);
    const thresholds = Array(10).fill(0.1).map((val,idx) => (val += 0.1*idx));
    const entry = useIntersectionObserver(ref, {threshold: thresholds})
    const classes = useStyles({contentOpacity: Number(entry?.intersectionRatio)});

    return(
        <TimelineItem ref={ref} classes={{missingOppositeContent: classes.missingOppositeNoStyle, root: classes.timelineItemContent}}>
            <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent className={classes.timelineItemText}>
                Education
                <Card className={classes.card}>
                    <CardMedia 
                        image="/SlideShowImages/with_friends_at_rice.jpg"
                        title="Rice University event with friends"
                        className={classes.cardHeight}
                    />
                    <CardContent className={classes.cardContent}>
                        Here is some placeholder text that will be underneath the picture at Rice with my friends.
                    </CardContent>
                </Card>
            </TimelineContent>
        </TimelineItem>
    );
}

const useStyles = makeStyles<Theme, {contentOpacity: number}>({
    // Remove the blank space before the timeline line
    missingOppositeNoStyle: {
        "&:before": {
            display: 'none',
        }
    },

    timelineItemText: {
        textAlign: 'left',  
    },

    timelineItemContent: ({contentOpacity}) => ({
        height: '150vh',
        opacity: contentOpacity,
    }),

    cardHeight: {
        height: '125vh',
    },

    cardContent: {
        backgroundColor: 'grey',
    },

    card: {
        marginTop: '20px',
        marginLeft: '20px',
    },

});


export default HomePage;