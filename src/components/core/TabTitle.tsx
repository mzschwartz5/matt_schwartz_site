interface ITabTitle {
    text: string;
    overrideClass?: string;
}

const TabTitle: React.FunctionComponent<ITabTitle> = (props:ITabTitle): JSX.Element =>
{
    const {text,overrideClass} = props;

    return(
        <p className={overrideClass}>{text}</p>
    );
}

export default TabTitle;