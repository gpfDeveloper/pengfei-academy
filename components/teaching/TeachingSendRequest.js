import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendRequestAsync } from 'store/teaching-async';

import { TextField, Button, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { Controller, useForm } from 'react-hook-form';

export default function TeachingSendRequest() {
  const dispatch = useDispatch();

  const [isSaving, setIsSaving] = useState(false);
  const { token } = useSelector((state) => state.user);
  const teachingState = useSelector((state) => state.teaching);
  const { skypeName, message } = teachingState;

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  const onSubmit = ({ skypeName, message }) => {
    setIsSaving(true);
    dispatch(sendRequestAsync({ skypeName, message, token })).then(() =>
      setIsSaving(false)
    );
  };
  return (
    <Stack sx={{ gap: 2 }} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="skypeName"
        defaultValue={skypeName}
        control={control}
        rules={{ required: true, maxLength: 200 }}
        render={({ field }) => (
          <TextField
            error={Boolean(errors.skypeName)}
            helperText={
              errors.skypeName &&
              'Please enter your skype name so we can have a meeting.'
            }
            label="Skype Name"
            {...field}
          />
        )}
      />
      <Controller
        name="message"
        defaultValue={message}
        control={control}
        rules={{ required: true, minLength: 100, maxLength: 1000 }}
        render={({ field }) => (
          <TextField
            rows={4}
            multiline
            placeholder="Talk about yourself, what you want to teach, your experience ..."
            error={Boolean(errors.message)}
            helperText={
              errors.message &&
              'Message must have at least 100 charactor and at most 1000 charactor to talk about yourself, what you want to teach, your experience ...'
            }
            label="Message"
            {...field}
          />
        )}
      />

      {!isSaving && (
        <Button size="large" variant="contained" type="submit">
          Continue
        </Button>
      )}
      {isSaving && (
        <LoadingButton loading size="large">
          Continue
        </LoadingButton>
      )}
    </Stack>
  );
}
