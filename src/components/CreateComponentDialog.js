import { Stepper,Step,StepLabel,Button,Box } from "@material-ui/core";
import React,{useRef, useState} from 'react';
import ChooseContentType from "./ChooseContentType";
import CreateImageContent from "./CreateImageContent";
import CreateTextContent from "./CreateTextContent";


const CreateComponentDialog=(props)=>{
    
    const [activeStep, setActiveStep] = useState(0);
    const [type, setType] = useState('');
    const steps = ['Select Content Type', 'Add content '];

    const imageRef = useRef();
    const textRef = useRef();

    const getStepContent = (stepIndex) => {
      switch (stepIndex) {
        case 0:
          return ( 
          <ChooseContentType setType={changeContentType}/>
          );
        case 1:
          switch(type) {
            case 'image':
              return (
                <CreateImageContent ref={imageRef} handleClose={props.handleClose}/>
              );
            case 'text':
              return (
                <div>
                  
                  <CreateTextContent ref={textRef} handleClose={props.handleClose}/>
                </div>
              );
            default:
              return (
                <Box textAlign="center"><p>Content type is not selected</p></Box>
              );
          }
          
        
        default:
          return 'Unknown stepIndex';
      }
    }

    const changeContentType = (newType) => {
      setType(newType);
    }

    const handleNext = () => {
      if (activeStep < steps.length - 1){
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
        else{
        if (type === 'image'){
          imageRef.current.uploadImageComponent();
        }
        else if ( type === 'text'){
          textRef.current.convertContentToHTML();
        }
      }
      
        
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    return(
        <Box paddingX="30px" height="400px" display="flex" flexDirection="column">
          <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                  <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                  </Step>
          ))}
          </Stepper>
          <div className="spacer">
              {getStepContent(activeStep)}
          </div>
          <Box display="flex" flexDirection="row" marginY="20px">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}               
            >
              Back
            </Button>
            <Button variant="contained" color="primary"
            onClick={handleNext}
            disabled={type === ''}>
              {activeStep === steps.length - 1 ? 'Save' : 'Next'}
            </Button>
            <span className="spacer"/>
            <Button onClick={props.handleClose}>Close</Button>
          </Box>

        </Box>
    );
}
export default CreateComponentDialog;