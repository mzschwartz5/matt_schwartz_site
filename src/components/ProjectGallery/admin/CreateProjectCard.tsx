import { Button, Dialog, DialogActions, makeStyles, DialogContent, DialogTitle } from "@material-ui/core";
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useState } from "react";
import { createProject, IProject, ProjectStatus } from "../../../data/projects_db";
import CreateCard from "../../core/CreateCard";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Timestamp } from "@firebase/firestore";
import { uploadNewImage } from "../../../data/database";
import { getDownloadURL } from "@firebase/storage";

interface ICreateProjectCardProps {
    setCreatedProjectRef: (createProjectRef: IProject) => void;
}

const CreateProjectCard: React.FunctionComponent<ICreateProjectCardProps> = (props:ICreateProjectCardProps): JSX.Element =>
{
    const {setCreatedProjectRef} = props;
    const [dialogOpen, setDialogOpen] = useState(false);
    const onClickAdd = () => setDialogOpen(true);
    const onCloseDialog = () => setDialogOpen(false);
    const onAcceptDialog = () => {
        createNewProject();
        onCloseDialog();
    }
    const classes = createProjectStyles();

    // Controlled input values
    const [title, setTitle] = useState("");
    const onTitleInputChange = (event:any) => setTitle(event.target.value);

    const [startDate, setStartDate] = useState<Date | null>();
    const onStartDateChange = (newValue: Date | null) => setStartDate(newValue);

    const [endDate, setEndDate] = useState<Date | null>();
    const onEndDateChange = (newValue: Date | null) => setEndDate(newValue);

    const [description, setDescription] = useState("");
    const onDescriptionChange = (event: any) => setDescription(event.target.value);

    const [githubUrl, setGithubUrl] = useState("");
    const onGithubUrlChange = (event: any) => setGithubUrl(event.target.value);

    const [liveDemoUrl, setLiveDemoUrl] = useState("");
    const onLiveDemoUrlChange = (event: any) => setLiveDemoUrl(event.target.value);

    const [videoUrl, setVideoUrl] = useState("");
    const onVideoUrlChange = (event: any) => setVideoUrl(event.target.value);

    const [imageFile, setImageFile] = useState<File|null|undefined>();
    const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0); // multiple file select is off by default
        setImageFile(file);
    }

    const [gif, setGif] = useState<File|null|undefined>();
    const onGifUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0); // multiple file select is off by default
        setGif(file);
    }

    const [tags, setTags] = useState<string[]>([]);
    const onTagsChange = (event: any) => setTags(event.target.value.split(","));

    // Create the new project
    const createNewProject = () => {
        if (!imageFile) {
            console.error("No image file selected");
            return;
        }

        const imageUploadPromise = uploadNewImage(imageFile, "/projects/images/" + title);
        const gifUploadPromise = gif ? uploadNewImage(gif, "/projects/gifs/" + title) : Promise.resolve(null);

        Promise.all([imageUploadPromise, gifUploadPromise]).then(([imageUploadResult, gifUploadResult]) => {
            if (!imageUploadResult) {
                console.error("Image upload failed");
                return;
            }

            const imageDownloadUrl = getDownloadURL(imageUploadResult.ref);
            const gifDownloadUrl = gifUploadResult ? getDownloadURL(gifUploadResult.ref) : "";

            Promise.all([imageDownloadUrl, gifDownloadUrl]).then(([imageDownloadUrl, gifDownloadUrl]) => {
                const newProject: IProject = {
                    blogReference: "", // not implemented yet
                    dateEnded: endDate ? Timestamp.fromDate(endDate) : null,
                    dateStarted: Timestamp.fromDate(startDate ? startDate : new Date()),
                    description: description,
                    githubUrl: githubUrl,
                    liveDemoUrl: liveDemoUrl,
                    videoUrl: videoUrl,
                    featuredImage: imageDownloadUrl,
                    featuredGif: gifDownloadUrl,
                    status: ProjectStatus.published, // not dealing with draft vs. published at the moment. Default to published.
                    title: title,
                    tags: tags,
                    hidden: false,
                    orderID: -1 // currently needs to be done manually in Firebase
                }

                createProject(newProject);
                setCreatedProjectRef(newProject);
                clearAllInputFields();
            })
        })
    }

    const clearAllInputFields = () => {
        setTitle("");
        setStartDate(null);
        setEndDate(null);
        setDescription("");
        setGithubUrl("");
        setLiveDemoUrl("");
        setVideoUrl("");
        setImageFile(null);
        setGif(null);
        setTags([]);
    }

    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CreateCard onClickAdd={onClickAdd}>
                <Dialog open={dialogOpen} onClose={onCloseDialog} className={classes.dialogContainer}>
                    <DialogTitle>New Project</DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <TextField placeholder="Project Title" value={title} onChange={onTitleInputChange} className={classes.inputField}/>
                        <DesktopDatePicker label="Start date" inputFormat="MM/dd/yyyy" value={startDate} onChange={onStartDateChange}  renderInput={(props: TextFieldProps) => <TextField {...props} />} InputProps={{style:{marginTop: "10px", marginBottom: "10px"}}}/>
                        <DesktopDatePicker label="End date" inputFormat="MM/dd/yyyy" value={endDate} onChange={onEndDateChange} renderInput={(props: TextFieldProps) => <TextField {...props} />} InputProps={{style:{marginTop: "10px", marginBottom: "10px"}}} />
                        <TextField multiline placeholder="Description" value={description} onChange={onDescriptionChange} className={classes.inputField}/>
                        <TextField placeholder="Tags (comma separated)" value={tags.join(", ")} onChange={onTagsChange} className={classes.inputField}/>
                        <TextField placeholder="Github URL" value={githubUrl} onChange={onGithubUrlChange} className={classes.inputField}/>
                        <TextField placeholder="Live Demo URL" value={liveDemoUrl} onChange={onLiveDemoUrlChange} className={classes.inputField}/>
                        <TextField placeholder="Video URL" value={videoUrl} onChange={onVideoUrlChange} className={classes.inputField}/>
                        <label>Featured Image</label>
                        <input type="file" onChange={onImageUpload} accept=""/>
                        <label>Featured Gif</label>
                        <input type="file" onChange={onGifUpload} accept=""/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onCloseDialog}>Cancel</Button>
                        <Button onClick={onAcceptDialog}>Accept</Button>
                    </DialogActions>
                </Dialog>
            </CreateCard>
        </LocalizationProvider>
    );
}

const createProjectStyles = makeStyles({

    dialogContainer: {
        "& .MuiDialog-container": {
            width: "100%"
        }
    },

    dialogContent: {
        display: "flex",
        flexDirection: "column"
    },

    inputField: {
        "& .MuiInputBase-root": {
            marginTop: "10px !important",
            marginBottom: "10px !important",
            width: "20vw"   
        }
    },

})


export default CreateProjectCard;