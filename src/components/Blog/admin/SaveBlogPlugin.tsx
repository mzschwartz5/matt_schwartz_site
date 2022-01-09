import { useEffect, useState } from "react";
import Editor, { PluginProps } from "react-markdown-editor-lite";
import { IBlogReference, saveBlogDraft } from "../../../data/blogs_db";

// Override the built-in image button in the markdown editor toolbar 
const SaveBlogPlugin = (props: PluginProps) =>
{
    const blogRef: IBlogReference = props.config.blogRef;
    const [hasChanged, setHasChanged] = useState(false);
    const setHasChangedTrue = () => {
        setHasChanged(true);
    }
    props.editor.on("change", setHasChangedTrue);
    
    const save = () => {
        if (!hasChanged) return;

        const htmlContent = props.editor.getHtmlValue();
        const rawText = props.editor.getMdValue();
        const blogDraft: IBlogReference = {
            ...blogRef,
            excerpt: getExcerpt(htmlContent, 500),
            featuredImage: getFeaturedImage(rawText)
        }
        saveBlogDraft(blogDraft, htmlContent, rawText);
        setHasChanged(false); // reset flag
        console.log("Saved!");
    }

    useEffect(() => { 
        const autoSave = setInterval(save, 60000); // autosave once per minute
        return () => clearInterval(autoSave);
    },[]);

    return(
        <span onClick={save} className="button button-type-image" title="Save" style={{position: "relative"}}>
            Save
        </span>
    );
}

// Get the first numChars characters of the blog content, from within <p> tags (that is, ignore things like tables, quotes, etc.).
const getExcerpt = (htmlValue: string, numChars: number) => {
    // Old way of getting excerpt, before I realized that smarter people on StackOverflow had already solved this long ago.
    // const regEx = /<p>([ -;]|[=]|[?-~])*<\/p>/g;  // regex to find all paragraphs in the blog
    // const paragraphArray = htmlValue.match(regEx);

    // const content = paragraphArray?.map(par => {
    //     return par.replace("<p>","").replace("</p>","");
    // }).join(" ");

    const temp = document.createElement("DIV");
    temp.innerHTML = htmlValue;
    return String(temp.textContent?.slice(0, numChars)) + "...";
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

