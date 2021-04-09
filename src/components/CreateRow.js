import React, { useContext, useEffect } from "react";
import { Box, Button } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import PageContext from "../contexts/PageContext";
import RefreshContext from "../contexts/RefreshContext";

//-----------------------WRITTEN BY SAVVY-----------------------------------------------------
const CreateRow = () => {

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

    const [addRow, { data, loading }] = useMutation(CREATE_ROW);

    const pageId = useContext(PageContext);
    const refresh = useContext(RefreshContext);

    const handleCreate = () => {
        addRow({variables: { title: "newRow", pageId: pageId}});
    }

    useEffect(() => {

        if (!loading && data){
            refresh();
        }
        
    }, [data, loading]); // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <Box className="row-create" height="300px" border={2} borderColor="text.disabled" borderRadius="10px" marginTop="5px">
            <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                <Button variant="contained" size="large" onClick={handleCreate}>+</Button>
            </Box>
        </Box>

    );
  };
export default CreateRow;