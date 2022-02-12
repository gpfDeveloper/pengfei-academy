import { useState } from 'react';
import { TextField, Button, Stack, InputAdornment, Alert } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';

export default function ForgotPasswordForm() {
  const [isSendEmail, setIsSendEmail] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const onSubmit = ({ email }) => {
    axios.post('/api/user/forgot-password/sendEmail', { email });
    setIsSendEmail(true);
  };
  if (isSendEmail)
    return (
      <Alert severity="success">
        You should soon receive an email allowing you to reset your password.
        Please make sure to check your spam and trash if you cannot find the
        email.
      </Alert>
    );
  return (
    <Stack sx={{ gap: 2 }} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        defaultValue=""
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            error={Boolean(errors.email)}
            helperText={errors.email && 'Please enter your email address'}
            label="Email"
            type="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            {...field}
          />
        )}
      />
      <Button size="large" variant="contained" type="submit">
        Resset Password
      </Button>
    </Stack>
  );
}
