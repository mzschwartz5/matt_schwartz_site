import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { IBlogReference, loadAllBlogReferences } from "../../data/blogs_db";
import { activeUserAtom } from "../../data/users_db";
import CardSkeleton from "../core/CardSkeleton";
import BlogWriter from "./admin/BlogWriter";
import CreateBlogCard from "./admin/CreateBlogCard";
import BlogCard from "./BlogCard";
import BlogContent from "./BlogContent";

interface IBlogGalleryProps {
}

const BlogGallery: React.FunctionComponent<IBlogGalleryProps> = (props:IBlogGalleryProps): JSX.Element =>
{
    const classes = useCardStyles();
    const routeMatch = useRouteMatch();
    const [blogReferences,setBlogReferences] = useState<IBlogReference[]>([]);
    const [newBlog, setNewBlog] = useState<IBlogReference>();
    const activeUser = useRecoilValue(activeUserAtom)

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

    if (activeUser?.isAdmin) {
        blogCards.push(<CreateBlogCard setCreatedBlogRef={setNewBlog} key="CreateBlogCard"/>);
    }

    return(
        <Switch>
            <Route exact path={routeMatch.path}>
                <div>
                    <Grid container
                        alignContent="flex-start"
                        alignItems="center"
                        spacing={3}
                        className={classes.gridContainer}
                    >  
                        {blogCards.length ? blogCards : blogCardSkeletons}
                    </Grid>
                </div>
            </Route>
            <Route path={routeMatch.path + "/create/" + newBlog?.title}>
                {newBlog ? <BlogWriter blogRef={newBlog}/> : ""}
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