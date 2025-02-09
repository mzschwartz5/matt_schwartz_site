import { Card, CardHeader, CardMedia, CardContent, makeStyles, Grid, CardActions, Button, Theme } from "@material-ui/core";
import { IBlogReference } from "../../data/blogs_db";
import defaultImage from "../../assets/images/projectgallery/paella.jpg"
import { NavLink, useRouteMatch } from "react-router-dom";

interface IBlogCardProps {
    blogRef: IBlogReference,
    adminView: boolean,
    setEditedBlog: (editedBlogRef: IBlogReference) => void;
}

// UI element that represents a single blog entry and can be selected by the 
// user to load content. Takes a blog reference object as its props.
const BlogCard: React.FunctionComponent<IBlogCardProps> = (props:IBlogCardProps): JSX.Element =>
{
    const {blogRef, adminView, setEditedBlog} = props;
    const classes = useCardStyles();
    const routeMatch = useRouteMatch();
    const onClickEdit = () => {
        setEditedBlog(blogRef);
    }

    return(
        <Grid item className={classes.gridItem} xs={12} sm={6} md={4} lg={3} xl={3}>
            <Card className={classes.card}>
                <CardMedia 
                    className={classes.cardMedia}
                    image={blogRef.featuredImage ? blogRef.featuredImage : defaultImage} // eventually change this to blogRef.featuredImage
                    component="img"
                />
                <CardHeader 
                    title={blogRef.title}
                    subheader={blogRef.postDate.toDate().toDateString()} 
                    className={classes.cardBackground}
                />
                <CardContent className={classes.cardBackground}>
                    {blogRef.excerpt}
                </CardContent>
                <CardActions className={classes.cardBackground + " " + classes.cardActions}>
                    <NavLink exact to={routeMatch.path + "/" + blogRef.title} style={{textDecoration: "none"}}>
                        <Button>Read more</Button>
                    </NavLink>
                    {adminView ? 
                    <NavLink exact to={routeMatch.path + "/create/" + blogRef.title} style={{textDecoration: "none"}}>
                        <Button onClick={onClickEdit}>Edit</Button>
                    </NavLink> : ""}
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
    
        cardMedia: {
        },
    
        gridItem: {
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