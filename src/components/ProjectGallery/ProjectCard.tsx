import { Card, CardHeader, CardMedia, CardContent, makeStyles, Theme, CardActions } from "@material-ui/core";
import ImageListItem from '@mui/material/ImageListItem';
import defaultImage from "../../assets/images/projectgallery/paella.jpg"
import { IProject } from "../../data/projects_db";
import IconLink from "../core/IconLink";
import GitHubIcon from '@material-ui/icons/GitHub';
import { useMouse } from "../../hooks/useMouse";
import { useState, useEffect } from "react";

interface IProjectCard {
    project: IProject;
}

const ProjectCard: React.FunctionComponent<IProjectCard> = (props:IProjectCard): JSX.Element =>
{
    const {project} = props;
    const [mouseState, ref] = useMouse();
    const [cardTransitionNeeded, setCardTransitionNeeded] = useState(false);
    const classes = useCardStyles({x: mouseState.x, y: mouseState.y, transitionNeeded: cardTransitionNeeded});

    return(
        <ImageListItem sx={{lineHeight: "inherit", perspective: "1000px"}}>
            <Card className={classes.card}
                  ref={ref}
                  onMouseEnter={() => setCardTransitionNeeded(true)}
                  onMouseLeave={() => setCardTransitionNeeded(true)}
                  onTransitionEnd={() => setCardTransitionNeeded(false)}>
                <CardMedia
                    className={classes.cardMedia}
                    image={project.featuredImage ?? defaultImage}
                    title={project.title}
                    component="img"
                />
                <CardHeader
                    title={project.title}
                    subheader={project.dateStarted.toDate().toDateString()}
                    className={classes.cardBackground}
                    subheaderTypographyProps={{variant: "subtitle1"}}
                />
                <CardContent className={classes.cardBackground}>
                    {project.description}
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <IconLink image={<GitHubIcon/>} alignRight={true} altText="GitHub link" linkTo={project.githubUrl}/>
                </CardActions>
            </Card>
        </ImageListItem>
    );
}   

export default ProjectCard;

const useCardStyles = makeStyles<Theme, {x: number, y: number, transitionNeeded: boolean}>(theme => {
    
    const paperColor = theme.palette.paper.main;
    const textColor = theme.palette.text.primary;
    const backgroundColor = theme.palette.primary.main;

    return({

        card: ({x, y, transitionNeeded}) => ({
            transform: `translate3d(0px, 0px, 0.01px) rotateX(${y * -10}deg) rotateY(${x * -10}deg)`,
            borderRadius: "5px",
            margin: "10px",
            boxShadow: "10px 10px 5px 1px rgba(0,0,0,0.25)",
            // Push card forward onto new layer to allow for hardware acceleration
            transition: `${transitionNeeded ? "transform 0.1s ease-out" : ""}`,
            willChange: "transform", // helps browser optimize the animation
        }),
    
        cardMedia: {
        },
    
        cardBackground: {
            backgroundColor: paperColor,
            color: textColor,
            paddingBottom: "0px"
        },

        cardActions: {
            backgroundColor: paperColor,
            color: backgroundColor,
        }
    })
});