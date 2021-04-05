import SlideShowHeader from './SlideShowHeader';
import SlideShowBody from './SlideShowBody';
import SlideShowFooter from './SlideShowFooter';
import { ISlideProps } from './Slide';
import { useState } from 'react';

interface ISlideShowProps {

}

/*
    A carousel of images that can be clicked through. In the future I'll move the hard-coded data out to its own file to be loaded in.

    This component is mainly a container for the slideshow sub-components (body, footer). Like the sidebar, the slideshow has an
    "active" slide whose state is owned by this container, and accessors are given to the children.
*/
const SlideShow: React.FunctionComponent<ISlideShowProps> = (props:ISlideShowProps): JSX.Element =>
{
    const [activeSlideIdx, setActiveSlideIdx] = useState(0);
    
    const images = [
        '/SlideShowImages/linkedin_image.jpg',
        '/SlideShowImages/marathon_pic.jpg',
        '/SlideShowImages/with_friends_at_rice.jpg'
    ]
    const total = images.length;

    const Slides:ISlideProps[] = [
        {
            imagePath: images[0],
            caption: "First slide",
            active: true,
            index: 0,
            total: total
        },
        {
            imagePath: images[1],
            caption: "Second slide",
            active: false,
            index: 1,
            total: total
        },
        {
            imagePath: images[2],
            caption: "Third slide",
            active: false,
            index: 2,
            total: total
        }
    ]

    const SlideDescriptions: string[] = ["I graduated from Rice University in 2019 with a Bachelor of Science degree in Computational Physics with a minor in Applied Mathematics, and a 3.86 GPA.",
                                        "I work as a software developer at Epic Systems, developing FHIR APIs to exchange health care data. I also work as a web developer on AppOrchard - Epic's marketplace for healthcare applications.",
                                        "In my free time, I've been learning to play piano. I like to run and cycle, and I'm always down for a board game!"];
    const SlideTitles: string[] = ["Education","Experience","Hobbies"];

    return(
        <div className="slideshow-container">
            <SlideShowHeader />
            <SlideShowBody SlideProps={Slides} setActiveSlideIdx={setActiveSlideIdx} activeSlideIdx={activeSlideIdx} /> 
            <SlideShowFooter SlideDescriptions={SlideDescriptions} SlideTitles={SlideTitles} activeSlideIdx={activeSlideIdx} numSlides={total} setActiveSlideIdx={setActiveSlideIdx}/>
        </div>
    );
}

export default SlideShow;