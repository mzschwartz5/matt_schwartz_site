import { makeStyles } from "@material-ui/core";

interface ISectionHeaderProps {
    headerText: string;
    overrideClass?: string;
}

/*
    Generic header text. Provides a default styling but allowing for override style.
*/
const SectionHeader: React.FunctionComponent<ISectionHeaderProps> = (props:ISectionHeaderProps): JSX.Element =>
{
    const {headerText, overrideClass} = props;
    const classes = useStyles();

    return(
        <h2 className={overrideClass ? overrideClass : classes.default}>{headerText}</h2>
    );
}

const useStyles = makeStyles({
    default: {
        marginLeft: '15px',
        marginRight: '10px'
    }
});

export default SectionHeader;