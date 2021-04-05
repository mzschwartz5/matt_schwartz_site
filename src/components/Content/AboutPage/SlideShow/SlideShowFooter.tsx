import AboutMeText from "../AboutMeText";

interface ISlideShowFooterProps {
    SlideDescriptions: string[],
    SlideTitles: string[],
    activeSlideIdx: number,
    numSlides: number,
    setActiveSlideIdx: (index: number) => void;
}

/*
    Slide show footer - contains dots which you can click to change slide, and also indicate which slide you're on (currently hardcoded, will obviously not be in future).
    Also contains a slide title and description.
*/
const SlideShowFooter: React.FunctionComponent<ISlideShowFooterProps> = (props:ISlideShowFooterProps): JSX.Element =>
{
    const {SlideDescriptions, SlideTitles, activeSlideIdx, numSlides, setActiveSlideIdx} = props;

    const JumpToSlide = (slideIdx: number) => {
        if (slideIdx < numSlides && slideIdx >= 0) {
            setActiveSlideIdx(slideIdx);
        }
    } 

    return(
        <div className="slideshow-footer">
            <div className="slide-dots">
                <span className="dot" onClick={()=>JumpToSlide(0)}></span>
                <span className="dot" onClick={()=>JumpToSlide(1)}></span>
                <span className="dot" onClick={()=>JumpToSlide(2)}></span>
            </div>
            <AboutMeText headerText={SlideTitles[activeSlideIdx]} text={SlideDescriptions[activeSlideIdx]}/>
        </div>
    );
}

export default SlideShowFooter;