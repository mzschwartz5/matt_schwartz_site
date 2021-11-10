import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { BlogStatus, IBlogReference, loadAllBlogReferences } from "../../data/blogs_db";
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
    const [editedBlog, setEditedBlog] = useState<IBlogReference>();
    const activeUser = useRecoilValue(activeUserAtom);

    // Load metadata for all blogs upon component mount
    useEffect(() => {
        loadAllBlogReferences(setBlogReferences);
    }, []);     

    const blogCards = blogReferences.map((ref) => {
        if (!userCanViewBlog(activeUser?.isAdmin, ref.status)) return null;
        return <BlogCard blogRef={ref} key={ref.ID} adminView={activeUser?.isAdmin || false} setEditedBlog={setEditedBlog}/>
    })

    const blogCardSkeletons = Array.from(Array(12).keys()).map((_val, idx) => {
        return <CardSkeleton key={idx}/>
    });

    if (activeUser?.isAdmin) {
        blogCards.push(<CreateBlogCard setCreatedBlogRef={setEditedBlog} key="CreateBlogCard"/>);
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
            <Route path={routeMatch.path + "/create/" + editedBlog?.title}>
                {editedBlog ? <BlogWriter blogRef={editedBlog}/> : ""}
            </Route> 
            <Route path={routeMatch.path + "/:blogTitle"}>
                <BlogContent/>
            </Route>
        </Switch>


    );
}

const userCanViewBlog = (userIsAdmin: boolean | undefined, blogStatus: BlogStatus) => {
    if (!userIsAdmin && !(blogStatus === BlogStatus.published)) return false;
    return true
}

const useCardStyles = makeStyles({

    gridContainer: {
        height: "100%",
        padding: "15px 15px 0px 15px",
        width: "100%"
    },
});

export default BlogGallery;