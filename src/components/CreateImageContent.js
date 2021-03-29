import { useMutation, gql } from "@apollo/client";
import { Box, Button } from "@material-ui/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import PageContext from "../contexts/PageContext";
import RefreshContext from "../contexts/RefreshContext";
import RowContext from "../contexts/RowContext";
import Loading from './Loading';

const CREATE_IMAGE_COMPONENT = gql`
mutation CreateImageComponent($image: Upload, $rowIndex: Int!, $pageId: String!) {
    createImageComponent(image: $image, rowIndex: $rowIndex, pageId: $pageId){
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

const CreateImageContent = (props) => {

    const [image, setImage] = useState(null);
    const [focus, setFocus] = useState(false);
    const pageId = useContext(PageContext);
    const rowIndex = useContext(RowContext);
    const refresh = useContext(RefreshContext);
    const fileInputRef = useRef(); 

    const [update, {data, error, loading}] = useMutation(CREATE_IMAGE_COMPONENT);

    const handleSave = () => {
        update({variables:{
            image: image,
            rowIndex: rowIndex,
            pageId: pageId
        }});
    }

    useEffect(() => {
        if (!loading && data){
            refresh();
            props.handleChangeStatus('default');
        }
    }, [data, loading]);

    if (loading) return (<Loading/>);

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDragEnter = (e) => {
        e.preventDefault();
        setFocus(true);
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        setFocus(false);
    }

    const handleFileDrop = (e) => {
        e.preventDefault();
        setImage(e.dataTransfer.files[0]);
    }

    const handleClose = () => {
        props.handleChangeStatus('default');
    }

    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const fileSelected = () => {
        setImage(fileInputRef.current.files[0]);
    }

    return (
        <Box display="flex" height="100%" flexDirection="column" alignItems="center">

            <Box width="90%" height="60%" marginTop="10px" display="flex" justifyContent="center" alignItems="center"
            className={(focus) || (image) ? 'dropzone-focused' : 'dropzone'} onClick={fileInputClicked}
            onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleFileDrop} onDragOver={handleDragOver}>
                {(image) &&
                    <div>{image.name}</div>
                }
                {(!image) &&
                    <div>Drop Image here or click to Upload</div>
                }
            </Box>
            <Box display="none">
                <input ref={fileInputRef} type="file" onChange={fileSelected}/>
            </Box>

            <div className="spacer"></div>

            {/* <input type="file" placeholder="Choose a file" onChange={handleChange}/> */}

            {/* {(image) &&
            <img alt="preview" src={URL.createObjectURL(image)} width="200"/>
            } */}


            {/* <IKUpload
                fileName="test-upload.png"
                /> */}
            <Box display="flex" width="90%" margin="10px">
                <Button variant="contained" onClick={handleClose} size="small">Close</Button>
                <span className="spacer"></span>
                <Button variant="contained" onClick={handleSave} size="small" color="primary">Save</Button>
            </Box>
            


        </Box>
     
    );
  };

export default CreateImageContent;