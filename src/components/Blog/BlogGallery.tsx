import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { IBlogReference, loadAllBlogReferences } from "../../data/blogs_db";
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

    // Load metadata for all blogs upon component mount
    useEffect(() => {
        loadAllBlogReferences(setBlogReferences);
    }, []);     

    const blogCards = blogReferences.map((ref) => {
        return <BlogCard blogRef={ref} key={ref.ID}/>
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
                <BlogContent/>
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