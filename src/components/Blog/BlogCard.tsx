import { Card, CardHeader, CardMedia, CardContent, makeStyles, Grid, CardActions, Button, Theme } from "@material-ui/core";
import { IBlogReference } from "../../data/blogs_db";
import paellaImage from "../../assets/images/projectgallery/paella.jpg"
import { NavLink, useRouteMatch } from "react-router-dom";

interface IBlogCardProps {
    blogRef: IBlogReference,
}

// UI element that represents a single blog entry and can be selected by the 
// user to load content. Takes a blog reference object as its props.
const BlogCard: React.FunctionComponent<IBlogCardProps> = (props:IBlogCardProps): JSX.Element =>
{
    const {blogRef} = props;
    const classes = useCardStyles();
    const routeMatch = useRouteMatch();

    return(
        <Grid item className={classes.gridItem}>
            <Card className={classes.card}>
                <CardMedia 
                    className={classes.cardMediaDimension}
                    image={paellaImage} // eventually change this to blogRef.featuredImage
                />
                <CardHeader 
                    title={blogRef.title}
                    subheader={blogRef.postDate.toDate().toDateString()} 
                    className={classes.cardBackground}
                />
                <CardContent className={classes.cardBackground}>
                    {blogRef.excerpt}
                </CardContent>
                <CardActions className={classes.cardBackground}>
                    <NavLink exact to={routeMatch.path + "/" + blogRef.title} style={{textDecoration: "none"}}>
                        <Button className={classes.cardActions}>Read more</Button>
                    </NavLink>
                </CardActions>
            </Card>    
        </Grid>
    );
}

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
        },
        
        cardActions: {
            color: textColor
        }
    })
});

export default BlogCard;