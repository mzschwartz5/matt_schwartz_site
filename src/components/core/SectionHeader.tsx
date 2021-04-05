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
    const defaultClass = "section-header";

    return(
        <h2 className={overrideClass ? overrideClass : defaultClass}>{headerText}</h2>
    );
}

export default SectionHeader;