import { Grid, Card, CardHeader, CardMedia, CardContent, makeStyles, Theme, CardActions } from "@material-ui/core";
import paellaImage from "../../assets/images/projectgallery/paella.jpg"
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
        <Grid item className={classes.gridItem}>
            <Card className={classes.card}>
                <CardMedia 
                    className={classes.cardMediaDimension}
                    image={paellaImage}   // later this should be card.featuredImage
                    title={"This is a paella!"} // later this should be card.featuredImageAltText
                />
                <CardHeader 
                    title={project.title}
                    subheader={project.dateStarted.toDate().toDateString()} 
                    className={classes.cardBackground}
                    subheaderTypographyProps={{variant: "subtitle2"}}
                />
                <CardContent className={classes.cardBackground}>
                    {project.description}
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <IconLink image={<GitHubIcon/>}  altText="GitHub link" linkTo="https://github.com/mzschwartz5"/>
                </CardActions>
            </Card>
        </Grid>
    );
}   

export default ProjectCard;

const useCardStyles = makeStyles((theme:Theme) => {
    
    const paperColor = theme.palette.paper.main;
    const textColor = theme.palette.text.primary;

    return({
        card: {
            borderRadius: "12px",
            margin: "10px",
        },
    
        cardMediaDimension: {
            height: "25vh",
            width: "25vw",
        },
    
        gridItem: {
            maxWidth: "20vw",
        },
    
        cardBackground: {
            backgroundColor: paperColor,
            color: textColor,
            paddingBottom: "0px"
        },

        cardActions: {
            backgroundColor: paperColor,
        }
    })
});