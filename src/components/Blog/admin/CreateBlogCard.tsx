import { Timestamp } from "@firebase/firestore";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { BlogStatus, createNewBlog, IBlogReference } from "../../../data/blogs_db";
import { blogContentFolder } from "../../../data/database";
import CreateCard from "../../core/CreateCard";

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
    const onCloseDialog = () => setDialogOpen(false);
    const [newBlogTitle, setNewBlogTitle] = useState("");
    const onInputChange = (event: any) => setNewBlogTitle(event.target.value);

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
        <CreateCard onClickAdd={onClickAdd}>
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
        </CreateCard>
    );
}

const createBlogStyles = makeStyles({

    dialogContainer: {
        "& .MuiDialog-container": {
            width: "100%"
        }
    }
})

export default CreateBlogCard;