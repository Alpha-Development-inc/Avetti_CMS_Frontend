import React, { useContext, useEffect, useState } from "react";
import { ContentState, EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//import 'draft-js/dist/Draft.css';
import { Box, Button } from "@material-ui/core";
import { convertToHTML, convertFromHTML } from 'draft-convert';
import { useMutation, gql } from "@apollo/client";
import PageContext from "../contexts/PageContext";
import RowContext from "../contexts/RowContext";
import Loading from './Loading';
import ComponentContext from "../contexts/ComponentContext";
import RefreshContext from "../contexts/RefreshContext";



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
  const [create, {data, error, loading}] = useMutation(CREATE_TEXT_COMPONENT);
  const [edit, {data: editData, error: editError, loading: editLoading}] = useMutation(EDIT_TEXT_COMPONENT);

  const handleEditorChange = (state) => {
    setEditorState(state);
  }

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }

  const pageId = useContext(PageContext);
  const rowIndex = useContext(RowContext);
  const componentIndex = useContext(ComponentContext);
  const refreshPage = useContext(RefreshContext); 

  useEffect(() => {
    if (convertedContent){
      if (props.mode === 'create'){
        create({variables:{
          text: convertedContent,
          rowIndex: rowIndex,
          pageId: pageId
        }});
      }
      else{
        edit({variables:{
          text: convertedContent,
          componentIndex: componentIndex,
          rowIndex: rowIndex,
          pageId: pageId
        }});
      }
    }
  },[convertedContent]);

  useEffect(() => {
    if (!loading && data){
        refreshPage();
        props.handleChangeStatus();
    }
  }, [data, loading]);

  useEffect(() => {
    if (!editLoading && editData){
      refreshPage();
        props.handleChangeStatus();
    }
  }, [editData, editLoading]);

  if (loading) return (<Loading/>);

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
      <Box className="spacer">
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            options: ['inline', 'fontSize', 'textAlign'],
            inline: {
              options: ['bold', 'italic', 'underline', 'monospace']
            }
          }}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" margin="5px">
        <Button variant="contained" color="primary" onClick={convertContentToHTML} size="small">Save</Button> 
      </Box>
    </Box>
  );
  };

export default CreateTextContent;