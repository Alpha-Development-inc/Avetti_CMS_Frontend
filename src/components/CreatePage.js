import React, { useEffect } from "react";
import { Box, Button } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import '../styles/HomePage.css';

const CreatePage = (props) => {

    const CREATE_PAGE = gql`
        mutation CreatePage($title: String!) {
        createPage(title: $title){
        id
        title
        contentRows{
            contentComponents{
                text
            }
        }
        }
    }
    `;

    const [addPage, { data, error, loading }] = useMutation(CREATE_PAGE);

    useEffect(() => {
        if (!loading && data){
            console.log("page created:");
            console.log(data);
            props.addPage(data.createPage);
        }
    }, [data, loading]);

    const handleCreate = () => {
        addPage({variables: {title: props.pageTitle}});
    }

    return (

      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">

          <Button variant="contained" size="large" color="primary" onClick={handleCreate}>Create Page</Button>

      </Box>
     
    );
  };
export default CreatePage;