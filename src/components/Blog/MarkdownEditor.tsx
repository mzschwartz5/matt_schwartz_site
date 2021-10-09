import MdEditor, { Plugins } from 'react-markdown-editor-lite';
import "react-markdown-editor-lite/lib/index.css"; // styles for md editor
import MarkdownIt from 'markdown-it';
import ImageUploadPlugin from './ImageUploadPlugin';

const mdParser = new MarkdownIt();
MdEditor.unuse(Plugins.Image);

interface IMarkDownEditorProps {
    filePath: string // File path for given blog folder 
}

const MarkdownEditor: React.FunctionComponent<IMarkDownEditorProps> = (props:IMarkDownEditorProps): JSX.Element =>
{
    const imagePlugingConfig = {filePath: (props.filePath + "/images")} ;
    MdEditor.use(ImageUploadPlugin, imagePlugingConfig);

    return(
        <MdEditor
            renderHTML={(text) => mdParser.render(text)}
        />
    );
}

export default MarkdownEditor;