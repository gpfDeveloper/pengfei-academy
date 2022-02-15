import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';

export default function VideoPlayerBlob({ url, height, width }) {
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((data) => data.blob())
      .then((blob) => setBlobUrl(URL.createObjectURL(blob)));
  }, [url]);

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <ReactPlayer
        url={blobUrl}
        config={{ file: { attributes: { controlsList: 'nodownload' } } }}
        controls={true}
        width={width}
        height={height}
      />
    </div>
  );
}
