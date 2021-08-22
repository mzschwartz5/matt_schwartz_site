import TitleBar from './TitleBar';
import Timeline from './Timeline'

/*
    Main page - Container for whole site.
    In the future, will add routing to control when each tab renders and to be able to link to a specific tab.
*/
const HomePage: React.FunctionComponent = (): JSX.Element =>
{
    return(
    <>  
        <TitleBar/>
        <Timeline/>
    </>
    );
}

export default HomePage;