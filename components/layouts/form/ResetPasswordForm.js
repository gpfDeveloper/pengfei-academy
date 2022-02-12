import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  TextField,
  Button,
  Stack,
  InputAdornment,
  IconButton,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Controller, useForm } from 'react-hook-form';

import axios from 'axios';

export default function ResetPasswordForm() {
  const router = useRouter();
  const { token } = router.query;
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const onSubmit = async ({ email, password }) => {
    await axios.post(`/api/user/forgot-password/${token}`, { email, password });
  };

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
      <Controller
        name="password"
        defaultValue=""
        control={control}
        rules={{ minLength: 6, maxLength: 64 }}
        render={({ field }) => (
          <TextField
            error={Boolean(errors.password)}
            helperText={
              errors.password &&
              (errors.password.type === 'minLength'
                ? 'Password should have at least 6 charactor'
                : 'Password should have at most 64 charactors')
            }
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
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
