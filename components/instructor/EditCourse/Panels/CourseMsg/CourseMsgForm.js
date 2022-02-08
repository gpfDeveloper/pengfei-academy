import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateMyCourseMsgAsync } from 'store/course-async';

import { TextField, Button, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

export default function CourseMsgForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { token } = user;
  const course = useSelector((state) => state.course);
  const { id: courseId } = course;

  const [isSaving, setIsSaving] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm();

  useEffect(() => {
    setValue('welcomeMsg', course.welcomeMsg);
  }, []);

  const onSubmit = async ({ welcomeMsg }) => {
    setIsSaving(true);
    await dispatch(
      updateMyCourseMsgAsync({
        courseId,
        token,
        welcomeMsg,
      })
    );
    setIsSaving(false);
  };
  return (
    <Stack sx={{ gap: 2 }} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="welcomeMsg"
        defaultValue=""
        control={control}
        rules={{ maxLength: 1000 }}
        render={({ field }) => (
          <TextField
            error={Boolean(errors.subtitle)}
            multiline
            rows={4}
            helperText={
              errors.subtitle && 'Welcome message at most have 1000 charactors.'
            }
            label="Welcome message"
            {...field}
          />
        )}
      />
      {!isSaving && (
        <Button
          size="large"
          variant="contained"
          type="submit"
          sx={{ alignSelf: 'flex-start' }}
        >
          Save
        </Button>
      )}
      {isSaving && (
        <LoadingButton loading size="large" sx={{ alignSelf: 'flex-start' }}>
          Save
        </LoadingButton>
      )}
    </Stack>
  );
}
