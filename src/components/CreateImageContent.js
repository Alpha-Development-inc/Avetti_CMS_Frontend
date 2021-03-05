import { useMutation, gql } from "@apollo/client";
import { Box } from "@material-ui/core";
import { IKImage, IKUpload } from "imagekitio-react";
import React from "react";

const CREATE_IMAGE_COMPONENT = gql`
mutation CreateImageComponent($image: Upload, $rowIndex: Int!, $pageId: String!) {
    createImageComponent(image: $image, rowIndex: $rowIndex, pageId: $pageId){
        title
    }
}
`;

const CreateImageContent = (props) => {

    const [update] = useMutation(CREATE_IMAGE_COMPONENT);

    const handleUpload = (e) => {

        const file = e.target.files[0];
        update({variables:{
            image: file,
            rowIndex: 0,
            pageId: '111'
        }});

    }

    return (
        <Box display="flex" justifyContent="center">

            <input type="file" placeholder="Choose a file" onChange={handleUpload}/>


            {/* <IKUpload
                fileName="test-upload.png"
                /> */}


        </Box>
     
    );
  };

export default CreateImageContent;