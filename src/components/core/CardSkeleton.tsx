import ImageListItem from '@mui/material/ImageListItem';
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";

interface ICardSkeletonProps {

}

const CardSkeleton: React.FunctionComponent<ICardSkeletonProps> = (props:ICardSkeletonProps): JSX.Element =>
{
    const classes = useSkeletonStyles();

    return(
        <ImageListItem className={classes.container}>
            <Skeleton variant="text" width="100%" height="2vh" className={classes.skeleton}/>
            <Skeleton variant="text" width="60%" height="2vh" className={classes.skeleton}/>
            <Skeleton variant="rect" width="100%" height="30vh" className={classes.skeleton}/>
        </ImageListItem>
    );
}

const useSkeletonStyles = makeStyles({
    container: {
        width: "100%",
        padding: "1vh"
    },

    skeleton: {
        backgroundColor: "rgb(0 0 0 / 24%)",
        borderRadius: "5px",
    }
});

export default CardSkeleton;