import { Grid, Card, CardHeader, CardMedia, CardContent, makeStyles } from "@material-ui/core";
import paellaImage from "../../assets/images/projectgallery/paella.jpg"
import { IProject } from "../../data/projects_db";

interface IProjectCard {
    project: IProject;
}

const ProjectCard: React.FunctionComponent<IProjectCard> = (props:IProjectCard): JSX.Element =>
{
    const {project} = props;
    const classes = useCardStyles();

    return(
        <Grid item className={classes.gridItem}>
            <Card className={classes.card}>
                <CardHeader 
                    title={project.title}
                    subheader={project.dateStarted.toDate().toDateString()} 
                    className={classes.cardBackground}
                />
                <CardMedia 
                    className={classes.cardMediaDimension}
                    image={paellaImage}   // later this should be card.featuredImage
                    title={"This is a paella!"} // later this should be card.featuredImageAltText
                />
                <CardContent className={classes.cardBackground}>
                    {project.description}
                </CardContent>
            </Card>
        </Grid>
    );
}   

export default ProjectCard;

const useCardStyles = makeStyles({
    
    card: {
        borderRadius: "3px",
        margin: "10px"
    },

    cardMediaDimension: {
        height: "25vh",
        width: "25vw",
    },

    gridItem: {
        maxWidth: "25vw",
    },

    cardBackground: {
        backgroundColor: "#424242",
        color: "white"
    }
});