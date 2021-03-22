import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
import { EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//import 'draft-js/dist/Draft.css';
import { Box, Button } from "@material-ui/core";
import { convertToHTML } from 'draft-convert';
import { useMutation, gql } from "@apollo/client";
import PageContext from "../contexts/PageContext";
import RowContext from "../contexts/RowContext";
import Loading from './Loading';



const CREATE_TEXT_COMPONENT = gql`
mutation CreateTextComponent($text: String!, $rowIndex: Int!, $pageId: String!) {
  createTextComponent(text: $text, rowIndex: $rowIndex, pageId: $pageId){
    id
    title
    contentRows{
        contentComponents{
            type
            content
        }
    }
  }
}
`

const CreateTextContent = (props) => {

  const [editorState, setEditorState] = useState(
    () => {EditorState.createEmpty()}
  );

  const  [convertedContent, setConvertedContent] = useState(null);
  const [update, {data, error, loading}] = useMutation(CREATE_TEXT_COMPONENT);

  const handleEditorChange = (state) => {
    setEditorState(state);
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }

  const pageId = useContext(PageContext);
  const rowIndex = useContext(RowContext); 

  useEffect(() => {
    if (convertedContent){
      update({variables:{
        text: convertedContent,
        rowIndex: rowIndex,
        pageId: pageId
      }});
    }
  },[convertedContent]);

  useEffect(() => {
    if (!loading && data){
        props.handleChangeStatus();
    }
  }, [data, loading]);

  if (loading) return (<Loading/>);

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" margin="5px">
      <div className="App">
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            options: ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign'],
            inline: {
              options: ['bold', 'italic', 'underline', 'monospace']
            }
          }}
        />
      </div>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={convertContentToHTML} size="small">Save</Button> 
      </Box>
    </Box>
  );
  };

export default CreateTextContent;