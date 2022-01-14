import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendRequestAsync } from 'store/teaching-async';

import { TextField, Button, Typography, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';

const introText =
  'Please talk something about yourself, your teaching experience, do you have videos to be uploaded, do you already have audiences ...';

export default function TeachingSendRequest() {
  const dispatch = useDispatch();

  const [isSaving, setIsSaving] = useState(false);
  const { token } = useSelector((state) => state.user);
  const teachingState = useSelector((state) => state.teaching);
  const { message } = teachingState;

  const {
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchMessage = async () => {
      const data = await axios.get('/api/teaching/sendRequest', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setValue('message', data.data.message);
    };
    fetchMessage();
  }, [setValue, token]);

  const onSubmit = ({ message }) => {
    setIsSaving(true);
    dispatch(sendRequestAsync({ message, token })).then(() =>
      setIsSaving(false)
    );
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mt: 4,
        alignItems: 'flex-start',
        textAlign: 'left',
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h6">{introText}</Typography>
      <Controller
        name="message"
        defaultValue={message}
        control={control}
        rules={{ required: true, maxLength: 1000 }}
        render={({ field }) => (
          <TextField
            rows={4}
            multiline
            fullWidth
            placeholder={introText}
            error={Boolean(errors.message)}
            helperText={
              errors.message &&
              (errors.message.type === 'required'
                ? 'Please talk something about yourself.'
                : 'Message at most have 1000 charactors.')
            }
            label="Introduce yourself"
            {...field}
          />
        )}
      />

      <Box sx={{ alignSelf: 'flex-end' }}>
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
      </Box>
    </Box>
  );
}
