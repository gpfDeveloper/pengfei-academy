import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateMyCourseBasicInfoAsync } from 'store/course-async';

import {
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  Typography,
  Box,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { COURSE_CATEGORY, COURSE_LANGUAGE } from 'utils/constants';

export default function LandingPageBasicInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { token } = user;
  const course = useSelector((state) => state.course);
  const { id: courseId } = course;

  const [isSaving, setIsSaving] = useState(false);

  const allCategories = Object.keys(COURSE_CATEGORY);
  const allLanguages = Object.keys(COURSE_LANGUAGE);
  let subcategories = Object.keys(
    COURSE_CATEGORY[allCategories[0]].subcategory
  );

  const {
    formState: { errors },
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm();

  const [category, subcategory] = watch(['category', 'subcategory']);
  if (category) {
    subcategories = Object.keys(COURSE_CATEGORY[category].subcategory);
    if (subcategory && subcategories.indexOf(subcategory) === -1) {
      setValue('subcategory', '');
    }
  }

  useEffect(() => {
    setValue('title', course.title);
    setValue('subtitle', course.subtitle);
    setValue('description', course.description);
    setValue('language', course.langugae);
    setValue('category', course.category);
    setValue('subcategory', course.subcategory);
  }, []);

  const onSubmit = async ({
    title,
    subtitle,
    description,
    language,
    category,
    subcategory,
  }) => {
    setIsSaving(true);
    await dispatch(
      updateMyCourseBasicInfoAsync({
        courseId,
        token,
        title,
        subtitle,
        description,
        language,
        category,
        subcategory,
      })
    );
    setIsSaving(false);
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
        rules={{ required: true, maxLength: 6000 }}
        render={({ field }) => (
          <TextField
            error={Boolean(errors.description)}
            multiline
            rows={4}
            helperText={
              errors.description &&
              (errors.description.type === 'required'
                ? 'Course description is required'
                : 'Course description at most have 6000 charactors.')
            }
            label="Course description"
            {...field}
          />
        )}
      />
      <Typography sx={{ mt: 2, color: 'text.secondary' }}>
        Basic Info
      </Typography>
      <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', mb: 4 }}>
        <FormControl sx={{ width: 120 }}>
          <InputLabel id="Language">Language</InputLabel>
          <Controller
            name="language"
            defaultValue={allLanguages[0]}
            control={control}
            render={({ field }) => (
              <Select {...field} label="Language" labelId="Language">
                {allLanguages.map((k) => (
                  <MenuItem value={k} key={k}>
                    {k}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <FormControl sx={{ minWidth: 160 }} error={Boolean(errors.category)}>
          <InputLabel id="Category">Category</InputLabel>
          <Controller
            name="category"
            defaultValue={''}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} label="Category" labelId="Category">
                {allCategories.map((k) => (
                  <MenuItem value={k} key={k}>
                    {k}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {Boolean(errors.category) && (
            <FormHelperText>Please enter category</FormHelperText>
          )}
        </FormControl>
        <FormControl sx={{ minWidth: 160 }} error={Boolean(errors.subcategory)}>
          <InputLabel id="Subcategory">Subcategory</InputLabel>
          <Controller
            name="subcategory"
            defaultValue={''}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                label="Subcategory"
                labelId="Subcategory"
                error={Boolean(errors.subcategory)}
              >
                {subcategories.map((k) => (
                  <MenuItem value={k} key={k}>
                    {k}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {Boolean(errors.subcategory) && (
            <FormHelperText>Please enter subcategory</FormHelperText>
          )}
        </FormControl>
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
