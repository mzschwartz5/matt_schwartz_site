import { Card, CardHeader, CardMedia, CardContent, makeStyles, Theme, CardActions } from "@material-ui/core";
import ImageListItem from '@mui/material/ImageListItem';
import defaultImage from "../../assets/images/projectgallery/paella.jpg"
import { IProject } from "../../data/projects_db";
import IconLink from "../core/IconLink";
import GitHubIcon from '@material-ui/icons/GitHub';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import { useMouse } from "../../hooks/useMouse";
import { useSpring, animated } from '@react-spring/web';
import { useState, useEffect, useRef } from "react";

const MAX_ROATATION_DEGREES = -10;

interface IProjectCard {
    project: IProject;
}

const ProjectCard: React.FunctionComponent<IProjectCard> = (props:IProjectCard): JSX.Element =>
{
    const {project} = props;
    const [mouseState, mouseRef] = useMouse();
    const [isFlipped, setIsFlipped] = useState(false);
    const [imageHeight, setImageHeight] = useState(0);

    const classes = useCardStyles({flipped: isFlipped, frontHeight: imageHeight});

    const springProps = useSpring({
        transform: `rotateY(${MAX_ROATATION_DEGREES * mouseState.x + (Number(isFlipped) * 180)}deg)
                    rotateX(${MAX_ROATATION_DEGREES * mouseState.y}deg)`,
        config: { tension: 100, friction: 10 },
    });

    return(
        <ImageListItem sx={{lineHeight: "inherit", perspective: "1000px"}} onClick={() => setIsFlipped(!isFlipped)}>
            <animated.div style={springProps}>
                <Card className={classes.card} ref={mouseRef}>
                    <CardMedia
                        className={`${classes.cardMedia} ${classes.frontSide}`}
                        image={project.featuredImage ?? defaultImage}
                        title={project.title}
                        component="img"
                        onLoad={(e: React.SyntheticEvent<HTMLImageElement, Event>) => setImageHeight((e.target as HTMLImageElement).clientHeight)}
                    />
                    <CardHeader
                        title={project.title}
                        subheader={project.dateStarted.toDate().toDateString()}
                        className={`${classes.cardBackground} ${classes.backSide}`}
                        subheaderTypographyProps={{variant: "subtitle1"}}
                    />
                    <CardContent className={`${classes.cardBackground} ${classes.backSide}`}>
                        {project.description}
                    </CardContent>
                    <CardActions className={`${classes.cardActions} ${classes.backSide}`}>
                        <IconLink image={<GitHubIcon/>} alignRight={true} altText="GitHub link" linkTo={project.githubUrl}/>
                    </CardActions>
                    <div className={classes.flipIconContainer}>
                        {isFlipped ? "" : "Read"}
                        <ThreeSixtyIcon className={classes.flipIcon}/>
                    </div>
                </Card>
            </animated.div>
        </ImageListItem>
    );
}   

export default ProjectCard;

const useCardStyles = makeStyles<Theme, {flipped: boolean, frontHeight: number}>((theme) => {
    
    const paperColor = theme.palette.paper.main;
    const textColor = theme.palette.text.primary;
    const backgroundColor = theme.palette.primary.main;

    return({

        card: ({frontHeight}) => ({
            borderRadius: "5px",
            margin: "10px",
            boxShadow: "12px 12px 10px 2px rgba(0,0,0,0.25)",
            "&:hover": {
                cursor: "pointer",
                "& $flipIconContainer": {
                    display: "flex",
                },
            },
            position: "relative",
            // For some reason there's a little extra whitespace on some cards... subtracting 1px to fix it ¯\_(ツ)_/¯
            height: `${frontHeight - 1}px`,
        }),
    
        cardMedia: {
        },
    
        cardBackground: {
            backgroundColor: paperColor,
            color: textColor,
            paddingBottom: "0px",
            transform: "rotateY(180deg)", // to flip text so its not inverted
        },

        cardActions: {
            backgroundColor: paperColor,
            color: backgroundColor,
        },

        flipIconContainer: ({flipped}) => ({
            position: "absolute",
            bottom: "5px",
            right: "5px",
            display: "none",
            alignItems: "center",
            color: (flipped ? "black" : "white"),
        }),

        flipIcon: {
            marginLeft: "2px",
        },

        frontSide: ({flipped}) => ({
            display: flipped ? "none" : "block",
        }),

        backSide: ({flipped}) => ({
            display: flipped ? "block" : "none",
        }),
    })
});