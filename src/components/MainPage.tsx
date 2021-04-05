import { useState } from 'react';
import AboutMeTab from './Content/AboutPage/AboutMeRoot';
import ProjectsTab from './Content/ProjectsPage/ProjectsPageRoot';
import ContactTab from './Content/ContactPage/ContactPageRoot';
import ContentView from './Content/ContentView';
import SideBar from './SideBar/SideBar';


/*
    Main page - Container for whole site.
    In the future, will add routing to control when each tab renders and to be able to link to a specific tab.
*/
const MainPage: React.FunctionComponent = (): JSX.Element =>
{
    const tabTexts: string[] = ["About","Projects","Contact"];
    const [activeTab, setActiveTab] = useState(0);

    return(
    <>
        <SideBar 
            tabTexts={tabTexts}
            onTabClick={setActiveTab}
            activeTab={activeTab}
        />        
        <ContentView
            tabContents={[<AboutMeTab/>,<ProjectsTab/>,<ContactTab/>]}
            activeTab={activeTab}
        />
    </>
    );
}

export default MainPage;