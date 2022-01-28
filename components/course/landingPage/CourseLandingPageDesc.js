import { Typography, Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';

export default function CourseLandingPageDesc({ description }) {
  return (
    <Box>
      <Typography variant="h4">Description</Typography>
      <ReactMarkdown>{description}</ReactMarkdown>
    </Box>
  );
}
