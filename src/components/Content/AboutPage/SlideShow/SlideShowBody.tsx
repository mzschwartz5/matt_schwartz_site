import Slide, { ISlideProps } from "./Slide";

interface ISlideShowBodyProps {
    SlideProps: ISlideProps[]; // an array of slides
    setActiveSlideIdx: (index: number) => void;
    activeSlideIdx: number;
}

/*
    The slide show body takes in a set of slides (array of objects implements ISlideProps) and renders them, as well as
    forward and backward buttons that change the active slide. In the future, I'd like to make these buttons do scrolling transitions,
    instead of simple fades (though that'll be in the CSS, not this file). 
*/
const SlideShowBody: React.FunctionComponent<ISlideShowBodyProps> = (props:ISlideShowBodyProps): JSX.Element =>
{
    const {SlideProps, setActiveSlideIdx, activeSlideIdx} = props;
    const slides = CreateSlides(SlideProps,activeSlideIdx);
    const numSlides = slides.length;

    const NextSlide = () => {
        if (activeSlideIdx + 1 >= numSlides) {return};
        setActiveSlideIdx(activeSlideIdx + 1);
    };
    const PreviousSlide = () => {
        if (activeSlideIdx - 1 < 0) return;
        setActiveSlideIdx(activeSlideIdx - 1);
    }

    return(
        <div className="slideshow-body">
            {slides}
            <a className="slide-prev" onClick={PreviousSlide}>&#10094;</a>
            <a className="slide-next" onClick={NextSlide}>&#10095;</a>
            <br />
        </div>
    );
}

function CreateSlides(slideProps: ISlideProps[], activeSlideIdx:number) {    
    const slides =  slideProps.map( (slide) =>
        <Slide imagePath={slide.imagePath} caption={slide.caption} active={slide.index === activeSlideIdx} index={slide.index} total={slide.total}  />
    );
    
    return slides;
}

export default SlideShowBody;
