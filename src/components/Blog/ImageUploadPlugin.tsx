import { getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import { useEffect } from "react";
import { PluginProps, Plugins } from "react-markdown-editor-lite";
import { uploadNewImage } from "../../data/blogs_db";


// Override the built-in image button in the markdown editor toolbar 
const ImageUploadPlugin = (props: PluginProps) =>
{

    const [fileID, setFileID] = useState(0); 
    let filePath: string = "";
    useEffect(() => {
        filePath = props.config.filePath + "/image" + fileID.toString();
    }, [fileID])

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        if (!file) return;

        uploadNewImage(file, filePath).then(uploadResult =>
            getDownloadURL(uploadResult.ref).then(url => 
                props.editor.insertText("![](" + url + ")")
            )
        ); 

        setFileID(prevID => prevID + 1);

        console.log("Image uploaded!");
    }

    return(
        <span className="button button-type-image" title="Image" style={{position: "relative"}}>
            <i className="rmel-iconfont rmel-icon-image"></i>
            <input type="file" onChange={handleImageUpload} accept="" style={{position: "absolute", zIndex: 1, left: "0px", top: "0px", width: "24px", height: "28px", cursor: "pointer", opacity: 0}}/>
        </span>
    );
}

// The npm package for the markdown editor frankly has a really dumb API for overriding behavior. As a result, I'm 
// forced to do this dumbness of settings previously-undefined properties on this component.
// If I had built the markdown editor, it would accept an object adhering to an interface that accepts a JSX component along with the below options.
ImageUploadPlugin.pluginName = Plugins.Image;
ImageUploadPlugin.align = 'left';

export default ImageUploadPlugin;