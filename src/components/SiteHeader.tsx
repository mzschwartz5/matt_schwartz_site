import SectionHeader from "./core/SectionHeader"
import TabTitle from "./core/TabTitle"

interface ISiteHeaderProps {

}


const SiteHeader: React.FunctionComponent<ISiteHeaderProps> = (props :ISiteHeaderProps): JSX.Element =>
{
    return( 
        <>
            <SectionHeader headerText={"Matthew Schwartz"}/>
            <TabTitle text={"Home"} />
            <TabTitle text={"Projects"} />
            <TabTitle text={"Blog"} />
        </>
    );
}

export default SiteHeader;