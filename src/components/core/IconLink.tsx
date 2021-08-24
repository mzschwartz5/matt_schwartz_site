import { makeStyles } from "@material-ui/core/styles";

interface IIconLinkProps {
    imagePath: string;
    linkTo: string;
    altText: string;
}

const IconLink: React.FunctionComponent<IIconLinkProps> = (props:IIconLinkProps): JSX.Element =>
{
    const {imagePath, linkTo, altText} = props;
    const classes = useStyles();

    return(
        <a href={linkTo} target="_blank" rel="noreferrer" className={classes.icon} >
            <img src={imagePath} alt={altText} height="20px" width="20px"/>
        </a>
    );
}

const useStyles = makeStyles({
    icon: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: '5px',
        marginRight: '5px'
    }
});

export default IconLink;