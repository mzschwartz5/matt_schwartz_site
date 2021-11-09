import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Add } from "@material-ui/icons";

interface ICreateCardProps {
    onClickAdd: () => void;
    children: React.ReactNode;
}

const CreateCard: React.FunctionComponent<ICreateCardProps> = (props:ICreateCardProps): JSX.Element =>
{
    const { onClickAdd } = props;
    const classes = createCardStyles();

    return(
        <Grid item className={classes.container}>
            <Add className={classes.icon} onClick={onClickAdd}/>
            {props.children}
        </Grid>
    );
}

const createCardStyles = makeStyles({
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
})


export default CreateCard;