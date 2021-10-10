import { Card, CardHeader, CardMedia, CardContent, makeStyles, Grid, CardActions, Button } from "@material-ui/core";
import { IBlogReference } from "../../data/blogs_db";
import paellaImage from "../../assets/images/projectgallery/paella.jpg"
import { NavLink, useRouteMatch } from "react-router-dom";

interface IBlogCardProps {
    blogRef: IBlogReference,
    loadBlogContent: (path: string) => void,
}

// UI element that represents a single blog entry and can be selected by the 
// user to load content. Takes a blog reference object as its props.
const BlogCard: React.FunctionComponent<IBlogCardProps> = (props:IBlogCardProps): JSX.Element =>
{
    const {blogRef, loadBlogContent} = props;
    const classes = useCardStyles();
    const routeMatch = useRouteMatch();

    const loadBlogOnClick = () => {
        loadBlogContent(blogRef.storagePath);
    }

    return(
        <Grid item className={classes.gridItem}>
            <Card className={classes.card}>
                <CardHeader 
                    title={blogRef.title}
                    subheader={blogRef.postDate.toDate().toDateString()} 
                    className={classes.cardBackground}
                />
                <CardMedia 
                    className={classes.cardMediaDimension}
                    image={paellaImage}
                />
                <CardContent className={classes.cardBackground}>
                    {blogRef.excerpt}
                </CardContent>
                <CardActions className={classes.cardBackground}>
                    <NavLink exact to={routeMatch.path + "/" + blogRef.title} style={{textDecoration: "none"}}>
                        <Button className={classes.cardActions} onClick={loadBlogOnClick}>Read more</Button>
                    </NavLink>
                </CardActions>
            </Card>    
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
    },
    cardActions: {
        backgroundColor: "#5e5e5e",
        color: "white"
    }
});

export default BlogCard;