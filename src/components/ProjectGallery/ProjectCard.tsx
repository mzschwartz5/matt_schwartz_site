import { Grid, Card, CardHeader, CardMedia, CardContent, makeStyles, Theme, CardActions } from "@material-ui/core";
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
        <Grid item className={classes.gridItem} xs={12} sm={6} md={6} lg={4} xl={4}>
            <Card className={classes.card}>
                <CardMedia 
                    className={classes.cardMedia}
                    image={project.featuredImage ?? defaultImage}   // later this should be card.featuredImage
                    title={"This is a paella!"} // later this should be card.featuredImageAltText
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
        </Grid>
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
    
        gridItem: {
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