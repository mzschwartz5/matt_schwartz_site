import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";

const DocumentSkeleton: React.FunctionComponent = (): JSX.Element =>
{
    const classes = useSkeletonStyles();

    return(
        <>
            <Skeleton variant="text" width="100%" className={classes.skeleton}/>
            <Skeleton variant="text" width="100%" className={classes.skeleton}/>
            <Skeleton variant="text" width="100%" className={classes.skeleton}/>
            <Skeleton variant="text" width="100%" className={classes.skeleton}/>
            <Skeleton variant="text" width="60%" className={classes.skeleton}/>
            <Skeleton variant="rect" width="100%" height="100vh" className={classes.skeleton}/>
        </>
    );
}

const useSkeletonStyles = makeStyles({
    skeleton: {
        backgroundColor: "rgb(0 0 0 / 24%)"
    }
});

export default DocumentSkeleton;