import { Button, Stack, Typography } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';

export default function TeachingMeeting() {
  const scheduleMeetingHandler = () => {
    window.open('https://calendly.com/pengfei-gao');
  };
  return (
    <Stack sx={{ maxWidth: 800, margin: '4rem auto', gap: '4rem' }}>
      <Typography component="h3" variant="h3">
        Please click the button below to schedule a meeting with Pengfei
      </Typography>
      <Button
        variant="contained"
        size="large"
        fullWidth
        startIcon={<ScheduleIcon />}
        onClick={scheduleMeetingHandler}
      >
        Schedule a meeting on Pengfei&rsquo;s calendar.
      </Button>
      <Typography>
        After talking with Pengfei you can start to teach at Pengfei Academy.
      </Typography>
    </Stack>
  );
}
