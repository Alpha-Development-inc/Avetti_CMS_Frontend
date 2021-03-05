import React, { useState } from "react";
import { EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//import 'draft-js/dist/Draft.css';
import ReactDOM from 'react-dom';
import { Box } from "@material-ui/core";



// const CREATE_TEXT_COMPONENT = gql`
// mutation CreateTextComponent($text: Text, $rowIndex: Int!, $pageId: String!) {
//   createImageComponent(Text: $text, rowIndex: $rowIndex, pageId: $pageId){
//       title
//   }
// }
//`
const CreateTextContent = (props) => {
  const [editorState, setEditorState] = useState(() =>
  EditorState.createEmpty(),
);
 
//const onEditorStateChange = (editorStatenew) => { setEditorState(editorStatenew) }
    return (

        <Box display="flex" justifyContent="center">
         <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      
        </Box>
     
    );
  };

export default CreateTextContent;