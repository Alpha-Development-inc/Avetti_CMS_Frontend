
import { Stepper,Step,StepLabel,Button,Typography } from "@material-ui/core";
import React,{useState} from 'react';


function getSteps() {
    return ['select Content Type', 'add content '];
  }
  
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 
        <div>
            <h2>select type</h2>
            
        </div>;
      case 1:
        return <div>add Component</div>;
      
      default:
        return 'Unknown stepIndex';
    }
  }

const CreateComponentDialog=()=>{
    
    const [activeStep, setActiveStep] = useState(0);
    const steps=getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    return(
        <>
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
        <Button
                disabled={activeStep === 0}
                onClick={handleBack}
               
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
        </>
    );
}
export default CreateComponentDialog;