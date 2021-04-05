import TabContent from "../SideBar/TabContents";
import NameTag from './PageHeader';
import './index.css';

interface IContentViewProps {
	tabContents: JSX.Element[];
	className?: string;
	activeTab: number;
}

/*
	ContentView - the content corresponding to each tab.
	Tab contents are passed in via props, so this component is completely unaware of the actual content it hosts.
*/
const ContentView: React.FunctionComponent<IContentViewProps> = (contentProps:IContentViewProps): JSX.Element =>
{
    const {tabContents, className, activeTab} = contentProps;
    const tabContentsList = createTabContents(tabContents, activeTab);
    const defaultClass = "content-view";

    return (
		<div className={className ? className : defaultClass}>
			<NameTag />
            {tabContentsList}
        </div>
    );
}

function createTabContents(tabContents: JSX.Element[], activeTab: number): JSX.Element[] {
	
	const tabContentsList = tabContents.map((content,index) => 
		<TabContent tabContent={content} tabState={(activeTab===index)} key={index}/>
	); 

	return tabContentsList;
}

export default ContentView;