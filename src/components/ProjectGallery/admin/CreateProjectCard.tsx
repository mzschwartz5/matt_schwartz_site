import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import { IProject } from "../../../data/projects_db";
import CreateCard from "../../core/CreateCard";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

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
        console.log("Created!");
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

    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CreateCard onClickAdd={onClickAdd}>
                <Dialog open={dialogOpen} onClose={onCloseDialog} className={classes.dialogContainer}>
                    <DialogTitle>New Project</DialogTitle>
                    <DialogContent>
                        <TextField placeholder="Project Title" value={title} onChange={onTitleInputChange} style={{width: "20vw"}}/>
                        <DesktopDatePicker 
                            label="Start date"
                            inputFormat="MM/dd/yyyy"
                            value={startDate}
                            onChange={onStartDateChange}
                            renderInput={props => <TextField {...props} />}
                        />
                        <DesktopDatePicker 
                            label="End date"
                            inputFormat="MM/dd/yyyy"
                            value={endDate}
                            onChange={onEndDateChange}
                            renderInput={props => <TextField {...props} />}
                        />
                        <TextField multiline placeholder="Description" value={description} onChange={onDescriptionChange}/>
                        <TextField placeholder="Github URL" value={githubUrl} onChange={onGithubUrlChange}/>
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
    }
})


export default CreateProjectCard;