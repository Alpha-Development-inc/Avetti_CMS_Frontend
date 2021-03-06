import { Stepper,Step,StepLabel,Button,Box } from "@material-ui/core";
import React,{useState} from 'react';
import ChooseContentType from "./ChooseContentType";
import CreateImageContent from "./CreateImageContent";
import CreateTextComponent from './CreateTextContent'
const CreateComponentDialog=(props)=>{
    
    const [activeStep, setActiveStep] = useState(0);
    const [component, setComponent] = useState({
      type: '',
      content: ''
    })
    const steps = ['Select Content Type', 'Add content '];

    const getStepContent = (stepIndex) => {
      console.log("rendering.....");
      switch (stepIndex) {
        case 0:
          return ( 
          <ChooseContentType setType={changeContentType}/>
          );
        case 1:
          switch(component.type) {
            case 'image':
              return (
                <CreateImageContent/>
              );
            case 'text':
              return (
                <div>
                  
                  <CreateTextComponent/>
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
      setComponent({...component, type : newType});
      console.log(component);
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    return(
        <Box paddingX="30px">
          <h4>{component.type}</h4>
          <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                  <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                  </Step>
          ))}
          </Stepper>
          <div>
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
            disabled={component.type === ''}>
              {activeStep === steps.length - 1 ? 'Save' : 'Next'}
            </Button>
            <span className="spacer"/>
            <Button onClick={props.handleClose}>Close</Button>
          </Box>

        </Box>
    );
}
export default CreateComponentDialog;