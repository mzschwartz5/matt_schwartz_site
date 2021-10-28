import MdEditor, { Plugins } from 'react-markdown-editor-lite';
import "react-markdown-editor-lite/lib/index.css"; // styles for md editor
import MarkdownIt from 'markdown-it';
import ImageUploadPlugin from './ImageUploadPlugin';
import SaveBlogPlugin from './SaveBlogPlugin';
import { IBlogReference } from '../../../data/blogs_db';

const mdParser = new MarkdownIt();
MdEditor.unuse(Plugins.Image);

interface IMarkDownEditorProps {
    blogRef: IBlogReference // to save the blog-in-progress to  
    defaultValue: string    // blog content from previous save
}

const MarkdownEditor: React.FunctionComponent<IMarkDownEditorProps> = (props:IMarkDownEditorProps): JSX.Element =>
{
    const {blogRef, defaultValue} = props;
    const imagePlugingConfig = {filePath: (blogRef.storagePath + "/images")} ;
    const savePluginConfig = {blogRef: blogRef}
    MdEditor.use(ImageUploadPlugin, imagePlugingConfig);
    MdEditor.use(SaveBlogPlugin, savePluginConfig);

    return(
        <MdEditor
            renderHTML={(text) => mdParser.render(text)}
            style={{height: "100%"}}
            defaultValue={defaultValue}
        />
    );
}

export default MarkdownEditor;