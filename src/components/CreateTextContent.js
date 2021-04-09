import React, { useContext, useEffect, useState } from "react";
import { EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Box, Button } from "@material-ui/core";
import { convertToHTML, convertFromHTML } from 'draft-convert';
import { useMutation, gql } from "@apollo/client";
import PageContext from "../contexts/PageContext";
import RowContext from "../contexts/RowContext";
import Loading from './Loading';
import ComponentContext from "../contexts/ComponentContext";
import RefreshContext from "../contexts/RefreshContext";


//-----------------------WRITTEN BY SAVVY-----------------------------------------------------
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
`;

const EDIT_TEXT_COMPONENT = gql`
mutation EditTextComponent($text: String!, $componentIndex: Int!, $rowIndex: Int!, $pageId: String!) {
  editTextComponent(text: $text, componentIndex: $componentIndex, rowIndex: $rowIndex, pageId: $pageId){
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
`;

const CreateTextContent = (props) => {
  
  const [editorState, setEditorState] = useState(
    () => {
      if (props.mode === 'create'){
        return EditorState.createEmpty()
      }
      else{
        return EditorState.createWithContent(convertFromHTML(props.content));
      }
    }
  );

  const  [convertedContent, setConvertedContent] = useState(null);
  const [create, {data, loading}] = useMutation(CREATE_TEXT_COMPONENT);
  const [edit, {data: editData, loading: editLoading}] = useMutation(EDIT_TEXT_COMPONENT);

  const handleEditorChange = (state) => {
    setEditorState(state);
  }

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }

  const pageId = useContext(PageContext);
  const row = useContext(RowContext);
  const componentIndex = useContext(ComponentContext);
  const refreshPage = useContext(RefreshContext); 

  useEffect(() => {
    if (convertedContent){
      if (props.mode === 'create'){
        create({variables:{
          text: convertedContent,
          rowIndex: row.rowIndex,
          pageId: pageId
        }});
      }
      else{
        edit({variables:{
          text: convertedContent,
          componentIndex: componentIndex,
          rowIndex: row.rowIndex,
          pageId: pageId
        }});
      }
    }
  },[convertedContent]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!loading && data){
        refreshPage();
        props.handleChangeStatus();
    }
  }, [data, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!editLoading && editData){
      refreshPage();
      props.handleChangeStatus();
    }
  }, [editData, editLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return (<Loading/>);

  return (
    <Box height="100%">
      <Box height="100%">
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class box-elevated"
          toolbar={{
            options: ['inline', 'fontSize', 'textAlign'],
            inline: {
              options: ['bold', 'italic', 'underline', 'monospace']
            }
          }}
        />
      </Box>
      <Box className="control-buttons box-elevated">
        <Button variant="contained" color="danger" size="small" onClick={props.handleClose}>Close</Button>
        <span className="spacer"></span> 
        <Button variant="contained" color="primary" onClick={convertContentToHTML} size="small">Save</Button> 
      </Box>
    </Box>
  );
  };

export default CreateTextContent;