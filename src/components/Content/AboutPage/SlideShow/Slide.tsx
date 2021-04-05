export interface ISlideProps {
    imagePath: string,
    caption?: string,    // alt text
    active: boolean,
    index: number,       // index of given slide
    total: number        // total slides
}

/*
    This actual slide. Contains an image and metadata like index and caption.
*/
const Slide: React.FunctionComponent<ISlideProps> = (props:ISlideProps): JSX.Element =>
{  
    const {imagePath, caption, active, index, total} = props;
    return(
        <div className={"slideshow-slide fade " + (active ? "active" : "")}>
            <div className="slide-number">{index + 1} / {total}</div>
            <img src={imagePath} className="slideshow-image" alt={caption}/>
        </div>
    );
}

export default Slide;