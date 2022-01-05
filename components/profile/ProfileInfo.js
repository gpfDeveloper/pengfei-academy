import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { profileInfoUpdate } from 'store/user-async';

import { TextField, Button, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { Controller, useForm } from 'react-hook-form';

export default function ProfileInfo() {
  const dispatch = useDispatch();

  const [isSaving, setIsSaving] = useState(false);
  const { name, headline, bio, token } = useSelector((state) => state.user);

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  const onSubmit = ({ name, headline, bio }) => {
    setIsSaving(true);
    dispatch(profileInfoUpdate({ name, headline, bio, token })).then(() =>
      setIsSaving(false)
    );
  };
  return (
    <Stack sx={{ gap: 2 }} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        defaultValue={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            error={Boolean(errors.name)}
            helperText={errors.name && 'Please enter your full name'}
            label="Full name"
            {...field}
          />
        )}
      />
      <Controller
        name="headline"
        defaultValue={headline}
        control={control}
        rules={{ maxLength: 60 }}
        render={({ field }) => (
          <TextField
            error={Boolean(errors.headline)}
            helperText={errors.headline && 'Headline has at most 60 charactors'}
            label="Headline"
            placeholder="Engineer or Designer ..."
            {...field}
          />
        )}
      />
      <Controller
        name="bio"
        defaultValue={bio}
        control={control}
        rules={{ maxLength: 400 }}
        render={({ field }) => (
          <TextField
            rows={4}
            multiline
            error={Boolean(errors.bio)}
            helperText={errors.bio && 'Biography has at most 400 charactors'}
            label="Biography"
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
