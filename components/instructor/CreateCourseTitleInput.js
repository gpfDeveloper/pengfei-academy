import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { createCourseAsync } from 'store/course-async';
import { Stack, TextField, Typography, Box, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';

export default function CreateCourseTitleInput() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const { token } = user;
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  const onSubmit = async ({ title }) => {
    const course = await dispatch(createCourseAsync({ title, token }));
    if (course && course.id) {
      router.replace(`/instructor/course/${course.id}`);
    }
  };

  return (
    <Stack
      sx={{
        alignItems: 'center',
        gap: 4,
        textAlign: 'center',
      }}
    >
      <Box>
        <Typography fontWeight="bold" variant="h4" mb="1rem">
          How about a working title?
        </Typography>
        <Typography color="text.secondary">
          {
            "It's ok if you can't think of a good title now. You can change it later."
          }
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          alignSelf: 'stretch',
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="title"
          defaultValue=""
          control={control}
          rules={{ required: true, maxLength: 60 }}
          render={({ field }) => (
            <TextField
              error={Boolean(errors.title)}
              fullWidth
              placeholder="e.g. Learn Javascript from Scratch"
              helperText={
                errors.title &&
                (errors.title.type === 'required'
                  ? 'Please enter a title'
                  : 'Title have at most 60 charactor.')
              }
              {...field}
            />
          )}
        />
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          size="large"
          fullWidth
          type="submit"
        >
          Create Course
        </Button>
      </Box>
    </Stack>
  );
}
