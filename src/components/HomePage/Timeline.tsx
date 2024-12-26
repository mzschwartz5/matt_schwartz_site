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
import { Theme, useMediaQuery } from '@material-ui/core';
import EpicImagePath from '../../assets/images/homepage/Epic-exterior.jpg';
import AmazonImagePath from '../../assets/images/homepage/amazon.png';
import LinkedInImagePath from '../../assets/images/homepage/linkedin_image.jpg';
import UPennImagePath from '../../assets/images/homepage/UPennImage.png';
import RiceImagePath from '../../assets/images/homepage/riceuniv.png';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import HomeIcon from '@mui/icons-material/Home';
import { riceText, epicWorkExperienceText, amazonWorkExperienceText, uPennText, aboutMeText } from '../../data/static_content';

const Timeline: React.FunctionComponent = () =>
{
    const classes = useTimelineRootStyles();

    return(
        <MuiTimeline align="alternate" className={classes.timelineRoot}>
            <TimelineItemWrapper imagePath={LinkedInImagePath} imageAltText="About me" imageDesc={aboutMeText} imageTitle="About me" year="2024" DotIcon={HomeIcon}/>
            <TimelineItemWrapper imagePath={UPennImagePath} imageAltText="University of Pennsylvania" imageDesc={uPennText} imageTitle="Master's in Computer Graphics" year="2023" DotIcon={SchoolIcon}/>
            <TimelineItemWrapper imagePath={AmazonImagePath} imageAltText="Amazon Web Services" imageDesc={amazonWorkExperienceText} imageTitle="Amazon Web Services" year={"2021"} DotIcon={WorkIcon}/>
            <TimelineItemWrapper imagePath={EpicImagePath} imageAltText="Epic Systems" imageDesc={epicWorkExperienceText} imageTitle="Epic Systems" year={"2019"} DotIcon={WorkIcon}/>
            <TimelineItemWrapper imagePath={RiceImagePath} imageAltText="Rice University" imageDesc={riceText} imageTitle="B.S. in Computational Physics" year="2015" DotIcon={SchoolIcon}/>
            <TimelineItem></TimelineItem> {/* Empty item just to provide buffer at the bottom */}
        </MuiTimeline>
    );
}

interface ITimelineItemWrapperProps {
    imagePath: string,
    imageAltText: string,
    imageDesc: string,
    imageTitle: string,
    year: string,
    DotIcon: React.FunctionComponent,
}

const TimelineItemWrapper: React.FunctionComponent<ITimelineItemWrapperProps> = (props: ITimelineItemWrapperProps) =>
{
    const {imagePath, imageAltText, imageDesc, imageTitle, DotIcon} = props;
    const isMediumScreen = useMediaQuery((theme: Theme) => theme.breakpoints.between("sm","md"));

    // When an observed element passes a threshold of on-screen visibility, update its opacity accordingly for fade effect.
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null); // becomes ref to the element to fade
    const thresholds = useMemo(() => Array(100).fill(0.01).map((val,idx) => (val += 0.01*idx)), []);
    const entry = useIntersectionObserver(ref, {threshold: thresholds});
    const classes = useTimelineItemStyles({intersectionRatio: Number(entry?.intersectionRatio), isMediumScreen: isMediumScreen});

    if (Number(entry?.intersectionRatio) >= 0.5 && !hasAnimated) {
        setHasAnimated(true);
    }

    return(
        <TimelineItem className={classes.timelineItem} >
            <TimelineContent className="timelineContent">
                <Card className={`${classes.card} ${classes.fadeWithScroll}`}>
                    <CardMedia
                        ref={ref}
                        image={imagePath}
                        title={imageAltText}
                        className={classes.cardMedia}
                    />
                </Card>
            </TimelineContent>
            <TimelineSeparator className={classes.timelineSeparator}>
                <TimelineConnector className="timelineConnector"/>
                <TimelineDot className={classes.timelineDot} variant="outlined">
                    <DotIcon/>
                </TimelineDot>
                <TimelineConnector className="timelineConnector"/>
            </TimelineSeparator>
            <TimelineOppositeContent className={classes.timelineOppositeContent}>
                <div className={hasAnimated ? "cardTextAnimated" : "cardText"}>
                    <h2 className={`${classes.fadeWithScroll} imageTitle`}>{imageTitle}</h2>
                    <Card className={`${classes.cardOppositeContent} ${classes.fadeWithScroll}`}>
                        <CardContent>
                            {imageDesc.split('\n').map((str, index) => <p key={index}>{str}</p>)}
                        </CardContent>
                    </Card>
                </div>
            </TimelineOppositeContent>
            <TimelineDate year={props.year} intersectionRatio={Number(entry?.intersectionRatio)}/>
        </TimelineItem>
    );
}

interface TimelineDateProps {
    year: string,
    intersectionRatio: number;
}

const TimelineDate: React.FunctionComponent<TimelineDateProps> = ({ year, intersectionRatio }) => {
    const classes = useTimelineDateStyles({intersectionRatio: intersectionRatio});

    return(
        <div className={classes.timelineDate}>{year}</div>
    );
}

const useTimelineRootStyles = makeStyles({
    timelineRoot: {
        margin: "0px",
        padding: "0px",
    }
});

const useTimelineItemStyles = makeStyles<Theme, {intersectionRatio: number, isMediumScreen: boolean}>((theme:Theme) => {
    const paperColor = theme.palette.paper.main;
    const primaryColor = theme.palette.primary.main;
    const secondaryColor = theme.palette.secondary.main;
    const accentColor = theme.palette.accent.main;

    return({
        // All alternating styles applied to the timeline are here
        timelineItem: {
            position: "relative",
            height: "75vh",
            overflowX: "clip",
            overflowY: "visible",
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
                    padding: "0.35vw 1vw",
                },
                "& .imageTitle": {
                    marginLeft: "10px",
                    marginRight: "10px",
                    textAlign: "right",
                    color: paperColor,
                },
                "& .timelineConnector": {
                    backgroundColor: primaryColor,
                    width: "4px",
                },
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
                    padding: "0.35vw 1vw",
                },
                "& .imageTitle": {
                    marginLeft: "10px",
                    marginRight: "10px",
                    textAlign: "left",
                    color: paperColor,
                },
                "& .timelineConnector": {
                    backgroundColor: secondaryColor,
                    width: "4px",
                },
            },
        },

        cardMedia: {
            height: '100%',
        },

        card: ({isMediumScreen}) => ({
            borderRadius: "5px",
            width: isMediumScreen ? "90%" : "65%",
            height: '90%',
            boxShadow: "10px 10px 5px 1px rgba(0,0,0,0.25)",
        }),

        timelineOppositeContent: {
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "0.5vw 1vw",
        },

        cardOppositeContent: ({isMediumScreen}) => ({
            backgroundColor: paperColor,
            textAlign: "left",
            padding: "0px 12px 0px 12px",
            "& p": {
                margin: "8px 0px 8px 0px",
                lineHeight: "1.6em",
                fontSize: "17px",
                textIndent: "35px"
            },
            width: isMediumScreen ? "90%" : "80%",
            maxHeight: "60vh",
            overflowY: "auto",
            boxShadow: "10px 10px 5px 1px rgba(0,0,0,0.25)",
        }),

        fadeWithScroll: ({intersectionRatio}) => ({
            opacity: Math.sin(intersectionRatio * (Math.PI / 2)),
        }),

        timelineSeparator: {
            padding: "0vw 1.2vw",
            height: "90%",
            alignSelf: "center",
        },

        timelineDot: {
            color: accentColor,
            borderColor: accentColor,
        }
    });
});

const useTimelineDateStyles = makeStyles<Theme, {intersectionRatio: number}>((theme:Theme) => {
    const paperColor = theme.palette.paper.main;

    return {
        timelineDate: ({intersectionRatio}) => ({
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            color: paperColor,
            opacity: Math.sin(intersectionRatio * (Math.PI / 2)),
            fontWeight: 600,
            fontSize: "1.7em",
        })
    };
});

export default Timeline;