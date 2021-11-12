import { Theme, useMediaQuery } from '@material-ui/core';
import MobileAbout from './MobileAbout';
import Timeline from './Timeline'


const HomePage: React.FunctionComponent = (): JSX.Element =>
{
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));

    return(
    <>  
        { isSmallScreen ? <MobileAbout/> : <Timeline/> }
    </>
    );
}

export default HomePage;