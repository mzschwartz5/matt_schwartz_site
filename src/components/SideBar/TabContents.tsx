import "./index.css"

interface ITabContentProps {
	tabContent: JSX.Element;
	tabState: boolean;
}

/*
	TabContent - the actual tab content
*/
const TabContent: React.FunctionComponent<ITabContentProps> = ({tabContent,tabState}:ITabContentProps): JSX.Element =>
{
    
    return(
		<div className={"tabContent " + (tabState ? "active" : "")}>
			{tabContent}
		</div>
	);
}

export default TabContent;