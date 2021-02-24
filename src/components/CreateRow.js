import React, { useEffect } from "react";
import { Box, Button } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';

const CreateRow = (props) => {

    const CREATE_ROW = gql`
        mutation CreateRow($title: String!, $pageId: String!) {
        createRow(title: $title, pageId: $pageId){
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

    const [addRow, { data, error, loading }] = useMutation(CREATE_ROW);

    const handleCreate = () => {
        addRow({variables: { title: "newRow", pageId: props.pageId}});
    }

    useEffect(() => {

        if (!loading && data){
            console.log(data);
        }
        
    }, [data, loading]);

    return (

        <Box className="row-create" height="33%" border={2} borderColor="text.disabled" borderRadius="10px" marginTop="5px">
            <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                <Button variant="contained" size="large" onClick={handleCreate}>+</Button>
            </Box>
        </Box>

    );
  };
export default CreateRow;