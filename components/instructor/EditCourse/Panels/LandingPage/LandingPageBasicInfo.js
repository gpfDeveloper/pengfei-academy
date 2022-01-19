import { useState, useEffect } from 'react';

import {
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';

import { COURSE_CATEGORY } from 'utils/constants';

import LoadingButton from '@mui/lab/LoadingButton';

import { Controller, useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';

export default function LandingPageBasicInfo() {
  const dispatch = useDispatch();

  const [isSaving, setIsSaving] = useState(false);

  const allCategories = Object.keys(COURSE_CATEGORY);

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const onSubmit = async ({ title, subtitle, description, category }) => {
    console.log(title, subtitle, description, category);
  };
  return (
    <Stack sx={{ gap: 2 }} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        defaultValue=""
        control={control}
        rules={{ required: true, maxLength: 60 }}
        render={({ field }) => (
          <TextField
            error={Boolean(errors.title)}
            helperText={
              errors.title &&
              (errors.title.type === 'required'
                ? 'Course title is required'
                : 'Course title at most have 60 charactors.')
            }
            label="Course title"
            {...field}
          />
        )}
      />
      <Controller
        name="subtitle"
        defaultValue=""
        control={control}
        rules={{ required: true, maxLength: 120 }}
        render={({ field }) => (
          <TextField
            error={Boolean(errors.subtitle)}
            helperText={
              errors.subtitle &&
              (errors.subtitle.type === 'required'
                ? 'Course subtitle is required'
                : 'Course subtitle at most have 120 charactors.')
            }
            label="Course subtitle"
            {...field}
          />
        )}
      />
      <Controller
        name="description"
        defaultValue=""
        control={control}
        rules={{ required: true, maxLength: 4000 }}
        render={({ field }) => (
          <TextField
            error={Boolean(errors.description)}
            multiline
            rows={4}
            helperText={
              errors.description &&
              (errors.description.type === 'required'
                ? 'Course description is required'
                : 'Course description at most have 4000 charactors.')
            }
            label="Course description"
            {...field}
          />
        )}
      />
      <Box>
        <Typography sx={{ color: 'text.secondary', mb: 1 }}>
          Select a category
        </Typography>
        <Controller
          name="category"
          defaultValue={allCategories[0]}
          control={control}
          render={({ field }) => (
            <Select {...field}>
              {allCategories.map((k) => (
                <MenuItem value={k} key={k}>
                  {k}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </Box>
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
