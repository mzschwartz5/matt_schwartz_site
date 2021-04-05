interface ITabProps {
	tabText: string;
	tabState: boolean;
	setTabState: (index:number)=>void;
	id: number;
}

/*
	Tab component
	Each tab has closure over its "active" state.
*/
const Tab: React.FunctionComponent<ITabProps> = ( {tabText,tabState,setTabState,id}: ITabProps): JSX.Element =>
{
	const handleOnClick = () => {
		setTabState(id);
	}

	return(
		<li onClick={handleOnClick} className={"tablist-item " + (tabState ? "active" : "")} >
			<span className="tablist-text">{tabText}</span>
		</li>
	);
}

export default Tab;