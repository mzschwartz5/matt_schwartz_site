import { makeStyles, Theme } from "@material-ui/core/styles";

interface IIconLinkProps {
    image: JSX.Element; // material UI icon
    linkTo: string;
    altText: string;
    alignRight?: boolean;
    propagateClick?: boolean;
}

const IconLink: React.FunctionComponent<IIconLinkProps> = (props:IIconLinkProps): JSX.Element =>
{
    const {image, linkTo, altText, alignRight = false, propagateClick = false} = props;
    const classes = useStyles({alignRight: alignRight});

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!propagateClick) e.stopPropagation();
    }

    return(
        <a href={linkTo} target="_blank" rel="noreferrer" className={classes.icon} title={altText} onClick={handleClick} >
            {image}
        </a>
    );
}

const useStyles = makeStyles<Theme, {alignRight: boolean}>((theme: Theme) => {

    return({
        icon: ({alignRight}) => ({
            marginTop: 'auto',
            marginBottom: 'auto',
            display: "inline-block",
            lineHeight: '0',
            marginLeft: alignRight ? "auto" : "5px",
            marginRight: alignRight ? "0" : "5px",
            color: "inherit"
        })
    })
});

export default IconLink;