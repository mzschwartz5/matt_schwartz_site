interface ITextSectionProps {
    text: string;
    overrideClass?: string;
}

/*
    Generic text paragraph. Provides some default styling but allows for override
*/
const TextSection: React.FunctionComponent<ITextSectionProps> = (props:ITextSectionProps): JSX.Element =>
{
    const {text, overrideClass} = props;
    const defaultClass = "text-section";

    return(
        <p className={overrideClass ? overrideClass : defaultClass}>{text}</p>
    );
}

export default TextSection;