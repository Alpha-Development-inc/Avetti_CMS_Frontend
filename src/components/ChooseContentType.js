import React, { useState } from "react";
import { FormControl, FormControlLabel, Radio, RadioGroup, Box } from '@material-ui/core';

//-----------------------WRITTEN BY SAVVY-----------------------------------------------------
const ChooseContentType = (props) => {

    const [type, setType] = useState('');

    const handleChange = (e) => {
        setType(e.target.value);
        props.setType(e.target.value);
    }

    return (
        <Box display="flex" justifyContent="center">
            <FormControl>
                <h3>Select Content Type:</h3>
                <RadioGroup aria-label="content type" name="type" value={type} onChange={handleChange}>
                    <FormControlLabel value="text" label="Text" control={<Radio/>}/>
                    <FormControlLabel value="image" label="Image" control={<Radio/>}/>
                </RadioGroup>
            </FormControl>
        </Box>
     
    );
  };
export default ChooseContentType;