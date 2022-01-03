import { useState } from 'react';

import {
  TextField,
  Button,
  Stack,
  IconButton,
  InputAdornment,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';

import { Controller, useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import { loginAsync } from 'store/auth-async';

export default function LoginForm() {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isLogining, setIsLogining] = useState(false);

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
  const onSubmit = ({ email, password }) => {
    setIsLogining(true);
    dispatch(loginAsync({ email, password })).then(() => setIsLogining(false));
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
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            error={Boolean(errors.password)}
            helperText={errors.password && 'Please enter your password'}
            label="Password"
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
      {!isLogining && (
        <Button size="large" variant="contained" type="submit">
          Log In
        </Button>
      )}
      {isLogining && (
        <LoadingButton loading size="large">
          Login
        </LoadingButton>
      )}
    </Stack>
  );
}
