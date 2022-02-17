import ReactMarkdown from 'react-markdown';
import { Box, Paper, Typography } from '@mui/material';
// import VideoPlayerBlob from 'components/UIs/VideoPlayerBlob';
import ReactPlayer from 'react-player/lazy';

export default function CourseLearnPageLecture({ lecture }) {
  const { contentType, title, article, video } = lecture;
  let content;
  if (contentType === 'video' && video && video.s3Location) {
    const { s3Location } = video;
    content = (
      <Box sx={{ margin: 1 }}>
        <ReactPlayer
          width="100%"
          height="100%"
          url={s3Location}
          controls={true}
        />
      </Box>
    );
  } else {
    content = (
      <Paper
        sx={{ padding: 4, margin: 2, overflow: 'auto', maxHeight: '80vh' }}
      >
        <Typography variant="h4">{title}</Typography>
        <Box
          sx={{ '& a': { textDecoration: 'underline', color: 'primary.main' } }}
        >
          <ReactMarkdown>{article}</ReactMarkdown>
        </Box>
      </Paper>
    );
  }
  return <Box sx={{ flexGrow: 1 }}>{content}</Box>;
}
