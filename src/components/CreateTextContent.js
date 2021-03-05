import React, { useState } from "react";
import { EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//import 'draft-js/dist/Draft.css';
import ReactDOM from 'react-dom';
import { Box } from "@material-ui/core";
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';



// const CREATE_TEXT_COMPONENT = gql`
// mutation CreateTextComponent($text: Text, $rowIndex: Int!, $pageId: String!) {
//   createImageComponent(Text: $text, rowIndex: $rowIndex, pageId: $pageId){
//       title
//   }
// }
//`
const CreateTextContent = (props) => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const  [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    console.log("1"+editorState);
    convertContentToHTML();
    console.log("2"+editorState);
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
    console.log("f"+convertedContent);
  }
  const createMarkup = (html) => {
    // return  {
    //   __html: DOMPurify.sanitize(html)
    // }
  }
  return (
    <Box display="flex" justifyContent="center">
      <div className="App">
        <header className="App-header">
          enter your text
        </header>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
        <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
      </div>
    </Box>
  );
  };

export default CreateTextContent;