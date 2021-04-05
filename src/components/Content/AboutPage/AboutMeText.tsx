import SectionHeader from "../../core/SectionHeader"
import TextSection from "../../core/TextSection"

interface IAboutMeProps {
    headerText: string,
    text: string
}

/*
    Simple component to display a title and text body.
*/
const AboutMeText: React.FunctionComponent<IAboutMeProps> = (props:IAboutMeProps): JSX.Element =>
{
    const {headerText, text} = props;

    return(
        <div>
            <SectionHeader headerText={headerText}/>
            <TextSection text={text}/>
        </div>
    );
}

export default AboutMeText;