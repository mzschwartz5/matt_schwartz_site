import { makeStyles } from "@material-ui/core/styles";

interface IIconLinkProps {
    image: JSX.Element; // material UI icon
    linkTo: string;
    altText: string;
}

const IconLink: React.FunctionComponent<IIconLinkProps> = (props:IIconLinkProps): JSX.Element =>
{
    const {image, linkTo, altText} = props;
    const classes = useStyles();

    return(
        <a href={linkTo} target="_blank" rel="noreferrer" className={classes.icon} title={altText} >
            {image}
        </a>
    );
}

const useStyles = makeStyles({
    icon: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: '5px',
        marginRight: '5px',
        display: "inline-block",
        lineHeight: '0'
    }
});

export default IconLink;