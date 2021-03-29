import { Stepper,Step,StepLabel,Button,Box } from "@material-ui/core";
import React,{useRef, useState} from 'react';
import ChooseContentType from "./ChooseContentType";
import CreateImageContent from "./CreateImageContent";
import CreateTextContent from "./CreateTextContent";
import ReactDOM from "react-dom";


const CreateComponentDialog=(props)=>{
    
    const [type, setType] = useState('');

    const changeContentType = (newType) => {
      setType(newType);
    }

    const handleSelect = () => {
      if (type === 'image'){
        props.handleChangeStatus('createImage');
      }
      else if ( type === 'text'){
        props.handleChangeStatus('createText');
      }
      props.handleClose();    
      };
    
    return(
        <Box paddingX="30px" display="flex" flexDirection="column">
          <ChooseContentType setType={changeContentType}/>
          <Box display="flex" flexDirection="row" marginY="20px">
            <Button variant="contained" color="primary"
            onClick={handleSelect}
            disabled={type === ''}>
              Select
            </Button>
            <span className="spacer"/>
            <Button onClick={props.handleClose}>Close</Button>
          </Box>

        </Box>
    );
}

export default CreateComponentDialog;