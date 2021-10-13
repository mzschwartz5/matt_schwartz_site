import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";

const DocumentSkeleton: React.FunctionComponent = (): JSX.Element =>
{
    const classes = useSkeletonStyles();

    return(
        <div className="blog-container">
            <Skeleton variant="text" width="100%" className={classes.skeleton}/>
            <Skeleton variant="text" width="100%" className={classes.skeleton}/>
            <Skeleton variant="text" width="100%" className={classes.skeleton}/>
            <Skeleton variant="text" width="100%" className={classes.skeleton}/>
            <Skeleton variant="text" width="60%" className={classes.skeleton}/>
            <Skeleton variant="rect" width="100%" height="100vh" className={classes.skeleton}/>
        </div>
    );
}

const useSkeletonStyles = makeStyles({
    skeletonContainer: {
        margin: "auto",
        paddingBottom: "5vh",
        paddingTop: "4vh",
        width: "75%"
    },
    
    skeleton: {
        backgroundColor: "rgb(0 0 0 / 24%)"
    }
});

export default DocumentSkeleton;