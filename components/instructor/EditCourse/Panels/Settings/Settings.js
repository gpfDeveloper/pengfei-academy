import { Box, Divider, Typography } from '@mui/material';
import SettingsDeleteCourse from './SettingsDeleteCourse';

export default function Settings() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Typography variant="h4">Settings</Typography>
      <Divider />
      <SettingsDeleteCourse />
    </Box>
  );
}
