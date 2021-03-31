import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@material-ui/core';
import RowPreview from './RowPreview';

const PagePreview = (props) => {
  const [page, setPage] = useState({
      contentRows: []
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/pages/' + props.pageTitle).then((response) => {
        setPage(response.data);
        console.log(response);
    });
  }, []);

  useEffect(() => {
    console.log(page);
  }, [page]);
 

  return (
    <Box display="flex" flexDirection="column" width="60%" marginX="auto" marginTop="30px">
        {page.contentRows.map((row, index) => (
            <RowPreview row={row} key={index}/>
        ))}
    </Box>
  );
};

export default PagePreview;