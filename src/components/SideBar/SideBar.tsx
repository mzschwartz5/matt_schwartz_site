import Tab from "./Tab";
import "./index.css"

interface ISideBarProps 
{
	tabTexts: string[];
	onTabClick: ((index: number) => void);
	className?: string;  // allow user to override style to increase reusability
	activeTab: number;
}

/*
	Side bar containing the different tabs of the site.
	Each tab gets a reference to the function to change the active tab.
*/
const SideBar: React.FunctionComponent<ISideBarProps> = (sideBarProps:ISideBarProps): JSX.Element =>
{
    const {tabTexts, onTabClick, className, activeTab} = sideBarProps;
    const tabs = createTabs(tabTexts, activeTab, onTabClick);

	return( // inject and differentiate styles via classname prop
		<div className="sidebar">
			<ul className="tablist">
				{tabs}
			</ul>
		</div>
	);
}
export default SideBar;

function createTabs(texts: string[], activeTab: number, setState: (index:number)=>void): JSX.Element[] {

	const tabs = texts.map((tabText,index) => (
		<Tab tabState={(activeTab===index)} tabText={tabText} setTabState={setState} id={index} key={index}/>
	));

	return tabs;
}