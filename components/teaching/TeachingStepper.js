import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { TEACHING_STATUS } from 'utils/constants';
import TeachingSignup from './TeachingSignup';
import TeachingSendRequest from './TeachingSendRequest';

const stepMap = {
  [TEACHING_STATUS.signup]: 0,
  [TEACHING_STATUS.sendRequest]: 1,
  [TEACHING_STATUS.haveMeeting]: 2,
  [TEACHING_STATUS.complete]: 3,
};

const steps = [
  'Sign up',
  'Send a request',
  'Have a meeting with Pengfei',
  'Teaching on Pengfei Academy!',
];

export default function TeachingStepper() {
  const isLogin = useSelector((state) => state.user?.isLogin);
  const currentStatus = useSelector((state) => state.teaching.status);
  let currentStep;
  if (!isLogin) {
    currentStep = 0;
  } else {
    currentStep = stepMap[currentStatus];
  }

  const [activeStep, setActiveStep] = useState(currentStep);

  useEffect(() => {
    setActiveStep(currentStep);
  }, [currentStep]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  let content;
  switch (activeStep) {
    case 0:
      content = <TeachingSignup />;
      break;
    case 1:
      content = <TeachingSendRequest />;
      break;
    case 2:
      content = <div>metting</div>;
      break;
    case 3:
      content = <div>finished</div>;
      break;
    default:
      content = <div>signup</div>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 4, mb: 1 }}>{content}</Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {activeStep > 1 && (
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
