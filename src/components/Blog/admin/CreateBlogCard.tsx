import { Timestamp } from "@firebase/firestore";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { BlogStatus, createNewBlog, IBlogReference } from "../../../data/blogs_db";
import { blogContentFolder } from "../../../data/database";

interface ICreateBlogCardProps {
    setCreatedBlogRef: (createBlogRef: IBlogReference) => void;
}

const CreateBlogCard: React.FunctionComponent<ICreateBlogCardProps> = (props: ICreateBlogCardProps): JSX.Element =>
{
    const {setCreatedBlogRef} = props;
    const classes = createBlogStyles();
    const routeMatch = useRouteMatch();
    const [dialogOpen, setDialogOpen] = useState(false);
    const onClickAdd = () => setDialogOpen(true);
    const onCloseDialog = () => {
        setDialogOpen(false);
    }
    const [newBlogTitle, setNewBlogTitle] = useState("");
    const onInputChange = (event: any) => {
        setNewBlogTitle(event.target.value);
    } 

    const onAcceptNewBlog = (event: any) => {
        if (newBlogTitle === "") {
            event.preventDefault();
            return;
        }

        let newBlog: IBlogReference = {
            ID: "", // will be generated on firebase server
            author: "Matthew Schwartz",
            category: "Website Creation Series",  // hardcoded for now
            excerpt: "", // set upon saving a draft
            featuredImage: "", // set upon saving a draft
            lastUpdate: Timestamp.now(),
            postDate: Timestamp.now(), // updated upon posting
            status: BlogStatus.draft,
            tags: [],
            title: newBlogTitle,
            storagePath: blogContentFolder + "/" + newBlogTitle,
        }

        const blogId = createNewBlog(newBlog);
        newBlog.ID = blogId;

        setCreatedBlogRef(newBlog);
    }

    return(
        <>
            <Grid item className={classes.container}>
                <Add className={classes.icon} onClick={onClickAdd}/>
                <Dialog open={dialogOpen} onClose={onCloseDialog} className={classes.dialogContainer}>
                    <DialogTitle>New Blog</DialogTitle>
                    <DialogContent>
                        <TextField placeholder="Blog Title" value={newBlogTitle} onChange={onInputChange} style={{width: "20vw"}}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onCloseDialog}>Cancel</Button>
                        <NavLink to={routeMatch.path + "/create/" + newBlogTitle} onClick={onAcceptNewBlog}>
                            <Button disabled={!newBlogTitle}>Accept</Button>
                        </NavLink>
                    </DialogActions>
                </Dialog>
            </Grid>
        </>
    );
}

const createBlogStyles = makeStyles({
    container: {
        margin: "12px",
        border: "1px dotted white",
        borderRadius: "10px",
        backgroundColor: "#d3d3d326",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#d3d3d314"
        }
    },

    icon: {
        width: "100%",
        height: "100%",
    },

    dialogContainer: {
        "& .MuiDialog-container": {
            width: "100%"
        }
    }
})

export default CreateBlogCard;