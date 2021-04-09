import { CircularProgress, Box } from "@material-ui/core";
import React from "react";

//-----------------------WRITTEN BY ALEX-----------------------------------------------------
const Loading = () => {

    return (

      <Box display="flex" alignItems="center" justifyContent="center" height="100%">

          <CircularProgress size={80}/>

      </Box>
     
    );
  };
export default Loading;