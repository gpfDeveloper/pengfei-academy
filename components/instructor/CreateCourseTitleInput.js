import { Stack, TextField, Typography, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function CreateCourseTitleInput() {
  const createCourseHandler = () => {};
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
      <TextField placeholder="e.g. Learn Javascript from Scratch." fullWidth />
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        size="large"
        fullWidth
        onClick={createCourseHandler}
      >
        Create Course
      </Button>
    </Stack>
  );
}
