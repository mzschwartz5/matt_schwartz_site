import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { IBlogReference, loadAllBlogReferences, loadBlogContent } from "../../data/blogs_db";
import BlogCard from "./BlogCard";
import BlogContent from "./BlogContent";

interface IBlogGalleryProps {
}

const BlogGallery: React.FunctionComponent<IBlogGalleryProps> = (props:IBlogGalleryProps): JSX.Element =>
{
    const classes = useCardStyles();
    const routeMatch = useRouteMatch();
    const [blogReferences,setBlogReferences] = useState<IBlogReference[]>([]);
    const [blogContent, setBlogContent] = useState<string>("");
    
    // Load metadata for all blogs upon component mount
    useEffect(() => {
        loadAllBlogReferences(setBlogReferences);
    }, []);     

    const loadBlog = (blogPath: string) => {
        loadBlogContent(blogPath, setBlogContent)
    }

    const blogCards = blogReferences.map((ref) => {
        return <BlogCard loadBlogContent={loadBlog} blogRef={ref} key={ref.ID}/>
    })

    return(
        <Switch>
            <Route exact path={routeMatch.path}>
                <Grid container
                    alignContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                    xl={3}
                    className={classes.gridContainer}
                >  
                    {blogCards}
                </Grid>
            </Route>
            <Route path={routeMatch.path + "/:blogTitle"}>
                <BlogContent htmlContent={blogContent} loadBlogContent={loadBlog}/>
            </Route>
        </Switch>


    );
}

const useCardStyles = makeStyles({
    gridItem: {
        maxWidth: "25vw",
    },

    gridContainer: {
        width: "100%"
    },
});

export default BlogGallery;