import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { accountSecurityUpdate } from 'store/user-async';

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

export default function AccountSecurity() {
  const dispatch = useDispatch();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const email = useSelector((state) => state.user.email);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  const onSubmit = ({ email, newPassword, currentPassword }) => {
    setIsSaving(true);
    dispatch(
      accountSecurityUpdate({ email, newPassword, currentPassword })
    ).then(() => setIsSaving(false));
  };
  return (
    <Stack sx={{ gap: 2 }} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        defaultValue={email}
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
        name="newPassword"
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
            label="New password"
            type={showNewPassword ? 'text' : 'password'}
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
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...field}
          />
        )}
      />
      <Controller
        name="currentPassword"
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
            label="Current password"
            type={showCurrentPassword ? 'text' : 'password'}
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
                    onClick={handleClickShowCurrentPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...field}
          />
        )}
      />
      {!isSaving && (
        <Button size="large" variant="contained" type="submit">
          Save
        </Button>
      )}
      {isSaving && (
        <LoadingButton loading size="large">
          Save
        </LoadingButton>
      )}
    </Stack>
  );
}
