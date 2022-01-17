import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStatusHaveMeeting } from 'store/teaching';

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
};

const STEPS_LABEL = [
  'Sign up',
  'Introduce yourself',
  'Meet Pengfei',
  'Teaching on Pengfei Academy!',
];

export default function TeachingStepper() {
  const token = useSelector((state) => state.user?.token);
  const dispatch = useDispatch();
  const currentStatus = useSelector((state) => state.teaching.status);
  const currentStep = stepMap[currentStatus];

  // If user already send teaching request move to next step.
  useEffect(() => {
    const fetchRequest = async () => {
      const data = await axios.get('/api/teaching/sendRequest', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const status = data?.data?.status;
      if (status) {
        dispatch(setStatusHaveMeeting());
      }
    };
    if (token && currentStatus === TEACHING_STATUS.sendRequest) {
      fetchRequest();
    }
  }, [token, currentStatus, dispatch]);

  let content;
  switch (currentStep) {
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
    <Box>
      <Stepper activeStep={currentStep}>
        {STEPS_LABEL.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {content}
    </Box>
  );
}
