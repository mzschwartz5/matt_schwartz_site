import { Card, CardHeader, CardMedia, CardContent, makeStyles, Theme, CardActions } from "@material-ui/core";
import ImageListItem from '@mui/material/ImageListItem';
import defaultImage from "../../assets/images/projectgallery/paella.jpg"
import { IProject } from "../../data/projects_db";
import IconLink from "../core/IconLink";
import GitHubIcon from '@material-ui/icons/GitHub';
import { useMouse } from "../../hooks/useMouse";
import { useSpring, animated } from '@react-spring/web';
import { useState } from "react";

const MAX_ROATATION_DEGREES = -10;

interface IProjectCard {
    project: IProject;
}

const ProjectCard: React.FunctionComponent<IProjectCard> = (props:IProjectCard): JSX.Element =>
{
    const {project} = props;
    const [mouseState, ref] = useMouse();
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
                <Card className={classes.card} ref={ref}>
                    <CardMedia
                        className={`${classes.cardMedia} ${classes.frontSide}`}
                        image={project.featuredImage ?? defaultImage}
                        title={project.title}
                        component="img"
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
                </Card>
            </animated.div>
        </ImageListItem>
    );
}   

export default ProjectCard;

const useCardStyles = makeStyles<Theme, {flipped: boolean}>((theme) => {
    
    const paperColor = theme.palette.paper.main;
    const textColor = theme.palette.text.primary;
    const backgroundColor = theme.palette.primary.main;

    return({

        card: {
            borderRadius: "5px",
            margin: "10px",
            boxShadow: "12px 12px 10px 2px rgba(0,0,0,0.25)",
            "&:hover": {
                cursor: "pointer"
            },
        },
    
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

        frontSide: ({flipped}) => ({
            display: flipped ? "none" : "block",
        }),

        backSide: ({flipped}) => ({
            display: flipped ? "block" : "none",
        }),
    })
});