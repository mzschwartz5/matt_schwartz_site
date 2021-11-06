import { PluginProps } from "react-markdown-editor-lite";
import { IBlogReference, saveBlogDraft } from "../../../data/blogs_db";

// Override the built-in image button in the markdown editor toolbar 
const SaveBlogPlugin = (props: PluginProps) =>
{
    const blogRef: IBlogReference = props.config.blogRef;

    const saveOnClick = () => {
        const htmlContent = props.editor.getHtmlValue();
        const rawText = props.editor.getMdValue();
        const blogDraft: IBlogReference = {
            ...blogRef,
            excerpt: getExcerpt(htmlContent, 500),
            featuredImage: getFeaturedImage(rawText)
        }
        saveBlogDraft(blogDraft, htmlContent, rawText);
    }

    return(
        <span onClick={saveOnClick} className="button button-type-image" title="Save" style={{position: "relative"}}>
            Save
        </span>
    );
}

// Get the first numChars characters of the blog content, from within <p> tags (that is, ignore things like tables, quotes, etc.).
const getExcerpt = (htmlValue: string, numChars: number) => {
    const regEx = /<p>([ -;]|[=]|[?-~])*<\/p>/g;  // regex to find all paragraphs in the blog
    const paragraphArray = htmlValue.match(regEx);

    const content = paragraphArray?.map(par => {
        return par.replace("<p>","").replace("</p>","");
    }).join(" ");


    return String(content?.slice(0, numChars));
}

const getFeaturedImage = (rawText: string) => {
    const startIndex = rawText.indexOf("![](") + 4; // markdown syntax for an image
    if (startIndex === -1) return "";
    const endIndex = rawText.indexOf(")", startIndex);

    return rawText.slice(startIndex, endIndex);
}

// The npm package for this markdown editor frankly has a really dumb API for overriding behavior. As a result, I'm 
// forced to do this dumbness of settings previously-undefined properties on this component, as if it's a class.
// If I had built the markdown editor myself, its props would include an object adhering to some interface that accepts a JSX component along with the below options.
SaveBlogPlugin.pluginName = "Save";
SaveBlogPlugin.align = 'left';

export default SaveBlogPlugin;