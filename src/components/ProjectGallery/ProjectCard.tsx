import { Card, CardHeader, CardMedia, CardContent, makeStyles, Theme, CardActions, Chip } from "@material-ui/core";
import ImageListItem from '@mui/material/ImageListItem';
import defaultImage from "../../assets/images/projectgallery/paella.jpg"
import { IProject } from "../../data/projects_db";
import IconLink from "../core/IconLink";
import GitHubIcon from '@material-ui/icons/GitHub';
import YoutubeIcon from '@material-ui/icons/YouTube';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
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
    const [isHovered, setIsHovered] = useState(false);
    const classes = useCardStyles({flipped: isFlipped});

    const springProps = useSpring({
        // Multiply by !isFlipped to prevent rotation when flipped (it's hard to read the text and click buttons when the card moves)
        transform: `rotateY(${MAX_ROATATION_DEGREES * mouseState.x * Number(!isFlipped) + (Number(isFlipped) * 180)}deg)
                    rotateX(${MAX_ROATATION_DEGREES * mouseState.y * Number(!isFlipped)}deg)`,
        config: { tension: 100, friction: 10 },
    });

    return(
        <ImageListItem sx={{lineHeight: "inherit", perspective: "1000px"}}
                       onClick={() => setIsFlipped(!isFlipped)}
                       onMouseEnter={() => setIsHovered(true)}
                       onMouseLeave={() => setIsHovered(false)}
        >
            <animated.div style={springProps}>
                <Card className={classes.card} ref={mouseRef}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={isHovered && !isFlipped && project.featuredGif ? project.featuredGif : project.featuredImage}
                        title={project.title}
                        component="img"
                    />
                    <CardHeader
                        title={project.title}
                        className={classes.frontSideTitle}
                        titleTypographyProps={{variant: "h6", color: "inherit"}}
                    />
                    <div className={classes.backSide + " " + classes.contentContainer}>
                        <CardHeader
                            title={project.title}
                            className={classes.cardContent}
                            subheaderTypographyProps={{variant: "subtitle1", color: "inherit"}}
                        />
                        <CardContent className={classes.cardContent}>
                            {project.description}
                        </CardContent>
                    </div>
                    <div className={classes.tagsAndActions}>
                        <CardActions className={classes.cardActions}>
                            {project.liveDemoUrl && <IconLink image={<VideogameAssetIcon/>} alignRight={true} altText="Live Demo link" linkTo={project.liveDemoUrl}/>}
                            {project.videoUrl && <IconLink image={<YoutubeIcon/>} alignRight={true} altText="Video link" linkTo={project.videoUrl}/>}
                            {project.githubUrl && <IconLink image={<GitHubIcon/>} alignRight={true} altText="GitHub link" linkTo={project.githubUrl}/>}
                        </CardActions>
                        <div className={classes.projectTags}>
                            {project.tags.map((tag) => {
                                return <Chip key={tag} label={tag} color="secondary" size="small" className={classes.projectChip}/>
                            })}
                        </div>
                    </div>
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
    const accentColor = theme.palette.accent.main;
    const primaryColor = theme.palette.primary.main;

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
                "& $frontSideTitle": {
                    display: flipped ? "none" : "flex",
                },
            },
            position: "relative",
            backgroundColor: flipped ? "transparent" : "inherit",
        }),
    
        cardMedia: ({flipped}) => ({
            filter: flipped ? "brightness(0.3)" : "none",
            opacity: flipped ? "0.5" : "1",
        }),

        contentContainer: {
            position: "absolute",
            top: "0",
            left: "0",
            maxHeight: "80%",
            overflow: "auto"
        },
    
        cardContent: {
            backgroundColor: 'transparent',
            color: `${textColor}`,
            paddingBottom: "0px",
            transform: "rotateY(180deg)", // to flip text so its not inverted,
        },

        frontSideTitle: ({flipped}) => ({
            backgroundColor: 'transparent',
            color: `${textColor}`,
            paddingBottom: "0px",
            position: "absolute",
            bottom: "0",
            left: "0",
            display: "none"
        }),

        projectChip: {
            margin: "2px",
            color: `${accentColor}`,
            outline: `1.5px solid ${primaryColor}`,
        },

        projectTags: {
            transform: "rotateY(180deg)", // to flip text so its not inverted,
            marginLeft: "auto",
            marginRight: "5px",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
        },

        tagsAndActions: ({flipped}) => ({
            position: "absolute",
            bottom: "0",
            left: "0",
            display: flipped ? "flex" : "none",
            width: "100%",
            justifyContent: "flex-start",
        }),

        cardActions: {
            backgroundColor: "transparent",
            color: `${textColor}`,
            transform: "rotateY(180deg)", // to flip icons so they're not inverted,
        },

        flipIconContainer: ({flipped}) => ({
            position: "absolute",
            top: "5px",
            right: flipped ? "auto" : "5px",
            left: flipped ? "5px" : "auto",
            display: "none",
            alignItems: "center",
            color: `${textColor}`,
        }),

        flipIcon: {
            marginLeft: "2px",
        },

        frontSide: ({flipped}) => ({
            display: flipped ? "none" : "inherit",
        }),

        backSide: ({flipped}) => ({
            display: flipped ? "inherit" : "none",
        }),
    })
});