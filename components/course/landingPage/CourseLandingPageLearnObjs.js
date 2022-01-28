import { Paper, Typography, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const ObjectiveItem = ({ item }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', padding: 1 }}>
      <CheckIcon />
      <Typography>{item}</Typography>
    </Box>
  );
};

export default function CourseLandingPageLearnObjs({ objectives }) {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h4" mb={2}>
        {"What you'll learn"}
      </Typography>
      {objectives.map((item) => (
        <ObjectiveItem key={item} item={item} />
      ))}
    </Paper>
  );
}
