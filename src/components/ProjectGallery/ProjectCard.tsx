import { Card, CardHeader, CardMedia, CardContent, makeStyles, Theme, CardActions } from "@material-ui/core";
import ImageListItem from '@mui/material/ImageListItem';
import defaultImage from "../../assets/images/projectgallery/paella.jpg"
import { IProject } from "../../data/projects_db";
import IconLink from "../core/IconLink";
import GitHubIcon from '@material-ui/icons/GitHub';
import { useMouse } from "../../hooks/useMouse";
import { useSpring, animated } from '@react-spring/web';

interface IProjectCard {
    project: IProject;
}

const ProjectCard: React.FunctionComponent<IProjectCard> = (props:IProjectCard): JSX.Element =>
{
    const {project} = props;
    const [mouseState, ref] = useMouse();
    const classes = useCardStyles();

    const springProps = useSpring({
        transform: `rotateY(${-10 * mouseState.x}deg) rotateX(${-10 * mouseState.y}deg)`,
        config: { tension: 300, friction: 10 },
    });

    return(
        <ImageListItem sx={{lineHeight: "inherit", perspective: "1000px"}}>
            <animated.div style={springProps}>
                <Card className={classes.card} ref={ref}>
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
            </animated.div>
        </ImageListItem>
    );
}   

export default ProjectCard;

const useCardStyles = makeStyles<Theme>(theme => {
    
    const paperColor = theme.palette.paper.main;
    const textColor = theme.palette.text.primary;
    const backgroundColor = theme.palette.primary.main;

    return({

        card: {
            borderRadius: "5px",
            margin: "10px",
            boxShadow: "10px 10px 5px 1px rgba(0,0,0,0.25)",
        },
    
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