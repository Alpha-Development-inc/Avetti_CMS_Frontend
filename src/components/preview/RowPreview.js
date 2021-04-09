import React from 'react';
import { Box } from '@material-ui/core';
import ComponentPreview from './ComponentPreview';

//-----------------------WRITTEN BY SAVVY-----------------------------------------------------
const RowPreview = (props) => {

  return (
    <Box width="100%" display="flex" justifyContent="space-around">
        {props.row.contentComponents.map((c, index) => (
            <ComponentPreview component={c} key={index}/>
        ))}
    </Box>
  );
};

export default RowPreview;