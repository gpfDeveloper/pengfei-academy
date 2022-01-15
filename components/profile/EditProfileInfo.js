import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { profileInfoUpdateAsync } from 'store/user-async';

import { TextField, Button, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';

export default function EditProfileInfo() {
  const dispatch = useDispatch();

  const [isSaving, setIsSaving] = useState(false);
  const { name, token } = useSelector((state) => state.user);

  const {
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm();

  const onSubmit = ({ name, headline, bio, website }) => {
    setIsSaving(true);
    dispatch(
      profileInfoUpdateAsync({ name, headline, bio, token, website })
    ).then(() => setIsSaving(false));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setValue('headline', data?.data?.headline);
      setValue('bio', data?.data?.bio);
      setValue('website', data?.data?.website);
    };
    fetchProfile();
  }, [token, setValue]);

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
        control={control}
        defaultValue=""
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
        control={control}
        defaultValue=""
        rules={{ maxLength: 6000 }}
        render={({ field }) => (
          <TextField
            rows={4}
            multiline
            error={Boolean(errors.bio)}
            helperText={errors.bio && 'Biography has at most 6000 charactors'}
            label="Biography"
            {...field}
          />
        )}
      />
      <Controller
        name="website"
        control={control}
        defaultValue=""
        rules={{ maxLength: 100 }}
        render={({ field }) => (
          <TextField
            error={Boolean(errors.website)}
            helperText={errors.website && 'website at most 100 charactors'}
            label="Website"
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
