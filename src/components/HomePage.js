import React from "react";
import { Box, Button } from '@material-ui/core';
import '../styles/HomePage.css';

const HomePage = () => {

    return (

      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
        
        <Box m="10px">
          <Button className="navitem" variant="contained" color="primary" href="/page1">Page 1</Button>
        </Box>
        
        <Box m="10px">
          <Button className="navitem" variant="contained" color="primary" href="/page2">Page 2</Button>
        </Box>
        
        <Box m="10px">
          <Button className="navitem" variant="contained" color="primary" href="/page3">Page 3</Button>
        </Box>
        
      </Box>
     
    );
  };
export default HomePage;