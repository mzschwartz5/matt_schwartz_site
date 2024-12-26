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
    const classes = useCardStyles({flipped: isFlipped});

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
                        className={classes.cardMedia}
                        image={project.featuredImage ?? defaultImage}
                        title={project.title}
                        component="img"
                    />
                    <div className={classes.backSide + " " + classes.contentContainer}>
                        <CardHeader
                            title={project.title}
                            subheader={project.dateStarted.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            className={`${classes.cardContent} ${classes.backSide}`}
                            subheaderTypographyProps={{variant: "subtitle1", color: "inherit"}}
                        />
                        <CardContent className={classes.cardContent}>
                            {project.description}
                        </CardContent>
                    </div>
                    <CardActions className={classes.cardActions + " " + classes.backSide}>
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

const useCardStyles = makeStyles<Theme, {flipped: boolean}>((theme) => {
    
    const textColor = theme.palette.text.secondary;

    return({

        card: ({flipped}) => ({
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
            backgroundColor: flipped ? "transparent" : "none",
        }),
    
        cardMedia: ({flipped}) => ({
            filter: flipped ? "grayScale(60%)" : "none",
            opacity: flipped ? "0.5" : "1",
        }),

        contentContainer: {
            position: "absolute",
            top: "0",
            left: "0",
            maxHeight: "85%",
            overflow: "auto"
        },
    
        cardContent: {
            backgroundColor: 'transparent',
            color: `${textColor}`,
            paddingBottom: "0px",
            transform: "rotateY(180deg)", // to flip text so its not inverted,
        },

        cardActions: {
            backgroundColor: "transparent",
            color: `${textColor}`,
            position: "absolute",
            bottom: "0",
            left: "0",
        },

        flipIconContainer: ({flipped}) => ({
            position: "absolute",
            bottom: "5px",
            right: "5px",
            display: "none",
            alignItems: "center",
            color: `${textColor}`,
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