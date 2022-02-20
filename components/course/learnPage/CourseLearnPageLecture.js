import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Box, Paper, Typography } from '@mui/material';
import VideoPlayer from 'components/UIs/VideoPlayer';
import axios from 'axios';

export default function CourseLearnPageLecture({ lecture }) {
  const { contentType, title, article, video } = lecture;
  const [lectureVideoUrl, setLectureVideoUrl] = useState(null);
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const { courseId } = router.query;
  const { token } = user;

  useEffect(() => {
    const fetchLectureVideoUrl = async () => {
      if (video && video.s3Key) {
        const { s3Key } = video;
        const data = await axios.post(
          `/api/course/${courseId}/learn/signedLectureVideoUrl`,
          { s3Key },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLectureVideoUrl(data.data.url);
      }
    };
    fetchLectureVideoUrl();
  }, [video, courseId, token]);

  let content;
  if (contentType === 'video' && lectureVideoUrl) {
    content = (
      <Box sx={{ margin: 1 }}>
        <VideoPlayer height="100%" width="100%" url={lectureVideoUrl} />
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
