import { Box, Typography } from '@mui/material';
import CourseItem from './CourseItem';

export default function CourseItems({ items }) {
  if (!items || items.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          mt: 12,
        }}
      >
        <Typography variant="h4">No course found</Typography>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        mt: 12,
      }}
    >
      {items.map((item) => (
        <CourseItem key={item.id} item={item} />
      ))}
    </Box>
  );
}
