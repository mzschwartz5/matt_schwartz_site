
import SlideShow from "./SlideShow/SlideShow";

interface IAboutMeProps {

}

/*
    Section of the website with information about the author
    Currently it simply hosts a slideshow of pictures and descriptions. 
*/
const AboutMeTab: React.FunctionComponent<IAboutMeProps> = (props:IAboutMeProps): JSX.Element =>
{

    return(
         <SlideShow />
    );
}

export default AboutMeTab;