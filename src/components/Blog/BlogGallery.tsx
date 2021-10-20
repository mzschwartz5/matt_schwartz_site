import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { BlogComment, IBlogReference, loadAllBlogReferences, loadBlogContent, loadCommentsForBlog } from "../../data/blogs_db";
import CardSkeleton from "../core/CardSkeleton";
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
    const [blogComments, setBlogComments] = useState<BlogComment[]>();
    const [activeBlogRef, setActiveBlogRef] = useState<IBlogReference>();

    // Load metadata for all blogs upon component mount
    useEffect(() => {
        loadAllBlogReferences(setBlogReferences);
    }, []);     

    const loadBlog = (blogRef: IBlogReference) => {
        loadBlogContent(blogRef.storagePath, setBlogContent);
        loadCommentsForBlog(blogRef, setBlogComments);
        setActiveBlogRef(blogRef);
    }

    const blogCards = blogReferences.map((ref) => {
        return <BlogCard loadBlogContent={loadBlog} blogRef={ref} key={ref.ID}/>
    })

    const blogCardSkeletons = Array.from(Array(12).keys()).map((_val, idx) => {
        return <CardSkeleton key={idx}/>
    });

    return(
        <Switch>
            <Route exact path={routeMatch.path}>
                <Grid container
                    alignContent="flex-start"
                    alignItems="flex-start"
                    spacing={3}
                    className={classes.gridContainer}
                >  
                    {blogCards.length ? blogCards : blogCardSkeletons}
                </Grid>
            </Route>
            <Route path={routeMatch.path + "/:blogTitle"}>
                <BlogContent htmlContent={blogContent} blogComments={blogComments} blogRef={activeBlogRef} loadBlogContent={loadBlog}/>
            </Route>
        </Switch>


    );
}

const useCardStyles = makeStyles({

    gridContainer: {
        height: "100%",
        width: "100%"
    },
});

export default BlogGallery;