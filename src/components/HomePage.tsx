import SiteHeader from "./SiteHeader"
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { makeStyles } from "@material-ui/core/styles";

/*
    Main page - Container for whole site.
    In the future, will add routing to control when each tab renders and to be able to link to a specific tab.
*/
const useStyles = makeStyles((theme) => ({
    // Remove the blank space before the timeline line
    missingOppositeNoStyle: {
        "&:before": {
            display: 'none',
        }
    },

    timelineItemText: {
        textAlign: 'left',
    },

    timelineItemContent: {
        height: '200px',
    },

}));

const HomePage: React.FunctionComponent = (): JSX.Element =>
{
    const classes = useStyles();

    return(
    <>
        <Timeline>
            <TimelineItem classes={{missingOppositeContent: classes.missingOppositeNoStyle, root: classes.timelineItemContent}}>
                <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className={classes.timelineItemText} >Eat</TimelineContent>
            </TimelineItem>
            <TimelineItem classes={{missingOppositeContent: classes.missingOppositeNoStyle, root: classes.timelineItemContent}}>
                <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className={classes.timelineItemText}>Code</TimelineContent>
            </TimelineItem>
            <TimelineItem classes={{missingOppositeContent: classes.missingOppositeNoStyle, root: classes.timelineItemContent}}>
                <TimelineSeparator>
                    <TimelineDot />
                </TimelineSeparator>
                <TimelineContent className={classes.timelineItemText}>Sleep</TimelineContent>
            </TimelineItem>
        </Timeline>
    </>
    );
}

export default HomePage;