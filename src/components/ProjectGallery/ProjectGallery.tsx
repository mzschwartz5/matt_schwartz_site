import { CardHeader, makeStyles, Card, CardMedia, Grid, CardContent } from "@material-ui/core";
import paellaImage from "../../assets/images/projectgallery/paella.jpg"

interface IProjectGaleryProps {

}

const ProjectGallery: React.FunctionComponent<IProjectGaleryProps> = (props:IProjectGaleryProps): JSX.Element =>
{
    const classes = useCardStyles();

    return(
        <Grid container
            alignContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            xl={3}
            className={classes.gridContainer}
        >   
        
            <Grid item className={classes.gridItem}>
                <Card className={classes.card}>
                    <CardHeader 
                        title="Test Gallery Item"
                        subheader="Date started: 09/1/2020" 
                        className={classes.cardBackground}
                    />
                    <CardMedia 
                        className={classes.cardMediaDimension}
                        image={paellaImage}
                        title={"This is a paella!"}
                    />
                    <CardContent className={classes.cardBackground}>
                        This is sample card content. It will give a brief description of the project on display.
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

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

    gridContainer: {
        width: "100%"
    },

    cardBackground: {
        backgroundColor: "#424242",
        color: "white"
    }
});

export default ProjectGallery;