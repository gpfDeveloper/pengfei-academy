import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import { TEACHING_STATUS } from 'utils/constants';
import TeachingSignup from './TeachingSignup';
import TeachingSendRequest from './TeachingSendRequest';
import TeachingMeeting from './TeachingMeeting';

const stepMap = {
  [TEACHING_STATUS.signup]: 0,
  [TEACHING_STATUS.sendRequest]: 1,
  [TEACHING_STATUS.haveMeeting]: 2,
  [TEACHING_STATUS.complete]: 3,
};

const steps = [
  'Sign up',
  'Introduce yourself',
  'Meet Pengfei',
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

  let content;
  switch (activeStep) {
    case 0:
      content = <TeachingSignup />;
      break;
    case 1:
      content = <TeachingSendRequest />;
      break;
    case 2:
      content = <TeachingMeeting />;
      break;
    default:
      content = <TeachingSendRequest />;
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
      {content}
    </Box>
  );
}
