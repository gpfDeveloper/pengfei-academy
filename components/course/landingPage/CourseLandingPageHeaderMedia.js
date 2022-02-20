import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import VideoPlayer from 'components/UIs/VideoPlayer';
import axios from 'axios';

function CourseLandingPageHeaderMedia({ promoVideoS3Key, thumbnail }) {
  const [promoVideoUrl, setPromoVideoUrl] = useState(null);
  useEffect(() => {
    const fetchPromoVideoUrl = async () => {
      if (promoVideoS3Key) {
        const data = await axios.post('/api/course/signedPromoVideoUrl', {
          s3Key: promoVideoS3Key,
        });
        setPromoVideoUrl(data.data.url);
      }
    };
    fetchPromoVideoUrl();
  }, [promoVideoS3Key]);
  return (
    <>
      {promoVideoUrl && (
        <VideoPlayer
          url={promoVideoUrl}
          thumbnail={thumbnail}
          width={375}
          height={211}
        />
      )}
      {!promoVideoUrl && Boolean(thumbnail) && (
        <Box component="img" src={thumbnail} width={375} height={211}></Box>
      )}
      {!promoVideoUrl && !thumbnail && (
        <Box
          component="img"
          src="/image-placeholder.svg"
          width={375}
          height={211}
        ></Box>
      )}
    </>
  );
}

export default dynamic(() => Promise.resolve(CourseLandingPageHeaderMedia), {
  ssr: false,
});
