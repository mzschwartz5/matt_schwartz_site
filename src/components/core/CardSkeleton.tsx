import ImageListItem from '@mui/material/ImageListItem';
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";

interface ICardSkeletonProps {

}

const CardSkeleton: React.FunctionComponent<ICardSkeletonProps> = (props:ICardSkeletonProps): JSX.Element =>
{
    const classes = useSkeletonStyles();

    return(
        <ImageListItem>
            <Skeleton variant="text" width="100%" className={classes.skeleton}/>
            <Skeleton variant="text" width="60%" className={classes.skeleton}/>
            <Skeleton variant="rect" width="100%" height="30vh" className={classes.skeleton}/>
        </ImageListItem>
    );
}

const useSkeletonStyles = makeStyles({
    skeleton: {
        backgroundColor: "rgb(0 0 0 / 24%)"
    }
});

export default CardSkeleton;