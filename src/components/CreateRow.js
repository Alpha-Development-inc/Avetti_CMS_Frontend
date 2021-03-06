import React, { useContext, useEffect } from "react";
import { Box, Button } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import PageContext from "../contexts/PageContext";

const CreateRow = (props) => {

    const CREATE_ROW = gql`
        mutation CreateRow($title: String!, $pageId: String!) {
        createRow(title: $title, pageId: $pageId){
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

    const [addRow, { data, error, loading }] = useMutation(CREATE_ROW);

    const pageId = useContext(PageContext);

    const handleCreate = () => {
        addRow({variables: { title: "newRow", pageId: pageId}});
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