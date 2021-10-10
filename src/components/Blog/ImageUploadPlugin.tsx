import { getDownloadURL } from "firebase/storage";
import React from "react";
import { PluginProps, Plugins } from "react-markdown-editor-lite";
import { uploadNewImage } from "../../data/blogs_db";


// Override the built-in image button in the markdown editor toolbar 
const ImageUploadPlugin = (props: PluginProps) =>
{

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0); // multiple file select is off by default
        if (!file) return;

        const filePath = props.config.filePath + "/" + file.name;

        uploadNewImage(file, filePath).then(uploadResult =>
            getDownloadURL(uploadResult.ref).then(url => 
                addImageUrlToBlog(url)
            )
        ); 

    }

    const addImageUrlToBlog = (url: string) => {
        props.editor.insertText("![](" + url + ")");
    }

    return(
        <span className="button button-type-image" title="Image" style={{position: "relative"}}>
            <i className="rmel-iconfont rmel-icon-image"></i>
            <input type="file" onChange={handleImageUpload} accept="" style={{position: "absolute", zIndex: 1, left: "0px", top: "0px", width: "24px", height: "28px", cursor: "pointer", opacity: 0}}/>
        </span>
    );
}

// The npm package for this markdown editor frankly has a really dumb API for overriding behavior. As a result, I'm 
// forced to do this dumbness of settings previously-undefined properties on this component, as if it's a class.
// If I had built the markdown editor myself, its props would include an object adhering to some interface that accepts a JSX component along with the below options.
ImageUploadPlugin.pluginName = Plugins.Image;
ImageUploadPlugin.align = 'left';

export default ImageUploadPlugin;