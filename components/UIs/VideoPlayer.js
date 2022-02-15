import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';

export default function VideoPlayer({ url }) {
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
        width={384}
        height={216}
      />
    </div>
    // <video
    //   controls
    //   controlsList="nodownload"
    //   ref={videoRef}
    //   height="216"
    //   width="384"
    // ></video>
  );
}
