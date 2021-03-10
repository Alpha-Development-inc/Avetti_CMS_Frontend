import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
import { EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//import 'draft-js/dist/Draft.css';
import { Box } from "@material-ui/core";
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

const CreateTextContent = forwardRef((props, ref) => {

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
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

  useImperativeHandle(ref, () => ({

    convertContentToHTML(){
      let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
      setConvertedContent(currentContentAsHTML);
    }

  }));

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
        props.handleClose();
    }
  }, [data, loading]);

  if (loading) return (<Loading/>);

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
      </div>
    </Box>
  );
  });

export default CreateTextContent;