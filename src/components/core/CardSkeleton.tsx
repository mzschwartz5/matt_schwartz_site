import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";

interface ICardSkeletonProps {

}

const CardSkeleton: React.FunctionComponent<ICardSkeletonProps> = (props:ICardSkeletonProps): JSX.Element =>
{
    const classes = useSkeletonStyles();

    return(
        <Grid item xl={3} sm={3} md={3} xs={3}>
            <Skeleton variant="text" width="100%" className={classes.skeleton}/>
            <Skeleton variant="text" width="60%" className={classes.skeleton}/>
            <Skeleton variant="rect" width="100%" height="30vh" className={classes.skeleton}/>
        </Grid>
    );
}

const useSkeletonStyles = makeStyles({
    skeleton: {
        backgroundColor: "rgb(0 0 0 / 24%)"
    }
});

export default CardSkeleton;