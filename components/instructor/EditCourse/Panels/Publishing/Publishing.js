import { useSelector } from 'react-redux';
import { Box, Divider, Typography } from '@mui/material';
import PublishingSubmitForReview from './PublishingSubmitForReview';
import { COURSE_REVIEW_STATUS } from 'utils/constants';
import PublishingReviewing from './PublishingReviewing';

export default function Publishing() {
  const course = useSelector((state) => state.course);
  const { reviewStatus } = course;
  const isReviewing = reviewStatus === COURSE_REVIEW_STATUS.reviewing;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Typography variant="h4">Publishing</Typography>
      <Divider />
      {!isReviewing && <PublishingSubmitForReview />}
      {isReviewing && <PublishingReviewing />}
    </Box>
  );
}
