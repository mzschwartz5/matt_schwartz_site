import { Card, CardMedia, Grid } from "@material-ui/core";


interface IProjectGaleryProps {

}

const ProjectGallery: React.FunctionComponent<IProjectGaleryProps> = (props:IProjectGaleryProps): JSX.Element =>
{
    return(
        <Grid container
            alignContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            sm={4}> 
            
            <Grid item>
                <Card>
                    <CardMedia
                        
                    />
                </Card>
            </Grid>
        </Grid>
    );
}

export default ProjectGallery;