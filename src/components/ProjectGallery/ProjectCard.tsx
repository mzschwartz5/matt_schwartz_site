import { Card, CardHeader, CardMedia, CardContent, makeStyles, Theme, CardActions } from "@material-ui/core";
import ImageListItem from '@mui/material/ImageListItem';
import defaultImage from "../../assets/images/projectgallery/paella.jpg"
import { IProject } from "../../data/projects_db";
import IconLink from "../core/IconLink";
import GitHubIcon from '@material-ui/icons/GitHub';


interface IProjectCard {
    project: IProject;
}

const ProjectCard: React.FunctionComponent<IProjectCard> = (props:IProjectCard): JSX.Element =>
{
    const {project} = props;
    const classes = useCardStyles();

    return(
        <ImageListItem sx={{lineHeight: "inherit"}}>
            <Card className={classes.card}>
                <CardMedia 
                    className={classes.cardMedia}
                    image={project.featuredImage ?? defaultImage}   // later this should be card.featuredImage
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

const useCardStyles = makeStyles((theme:Theme) => {
    
    const paperColor = theme.palette.paper.main;
    const textColor = theme.palette.text.primary;
    const backgroundColor = theme.palette.primary.main;

    return({
        card: {
            borderRadius: "12px",
            margin: "10px",
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
            color: backgroundColor
        }
    })
});