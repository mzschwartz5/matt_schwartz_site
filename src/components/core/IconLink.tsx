interface IIconLinkProps {
    imagePath: string;
    linkTo: string;
    altText: string;
    overrideClass?: string;
}

const IconLink: React.FunctionComponent<IIconLinkProps> = (props:IIconLinkProps): JSX.Element =>
{
    const {imagePath, linkTo, altText, overrideClass} = props;

    return(
        <a href={linkTo} target="_blank" rel="noreferrer" className={overrideClass}>
            <img src={imagePath} alt={altText} height="20px" width="20px"/>
        </a>
    );
}

export default IconLink;