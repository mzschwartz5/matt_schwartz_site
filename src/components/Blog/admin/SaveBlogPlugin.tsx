import { PluginProps } from "react-markdown-editor-lite";
import { IBlogReference, saveBlogDraft } from "../../../data/blogs_db";

// Override the built-in image button in the markdown editor toolbar 
const SaveBlogPlugin = (props: PluginProps) =>
{
    const blogRef: IBlogReference = props.config.blogRef;

    const saveOnClick = () => {
        const content = props.editor.getHtmlValue();
        saveBlogDraft(blogRef, content);
    }

    return(
        <span onClick={saveOnClick} className="button button-type-image" title="Save" style={{position: "relative"}}>
            Save
        </span>
    );
}

// The npm package for this markdown editor frankly has a really dumb API for overriding behavior. As a result, I'm 
// forced to do this dumbness of settings previously-undefined properties on this component, as if it's a class.
// If I had built the markdown editor myself, its props would include an object adhering to some interface that accepts a JSX component along with the below options.
SaveBlogPlugin.pluginName = "Save";
SaveBlogPlugin.align = 'left';

export default SaveBlogPlugin;