import ReactMarkdown from 'react-markdown';
import ReactPlayer from 'react-player';
import { Box, Typography } from '@mui/material';

export default function CourseLearnPageLecture({ lecture }) {
  const { contentType, title, article } = lecture;
  let content;
  if (contentType === 'article') {
    content = (
      <Box sx={{ padding: 4, maxWidth: 800 }}>
        <Typography variant="h4">{title}</Typography>
        <ReactMarkdown>{article}</ReactMarkdown>
      </Box>
    );
  } else {
    content = (
      <Box sx={{ margin: 1 }}>
        <ReactPlayer
          width="100%"
          height="100%"
          url="/video/demo.mp4"
          controls={true}
        />
      </Box>
    );
  }
  return <Box sx={{ flexGrow: 1 }}>{content}</Box>;
}
