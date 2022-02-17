import dynamic from 'next/dynamic';
import ReactPlayer from 'react-player/lazy';

function VideoPlayer({ url, height, width }) {
  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <ReactPlayer
        url={url}
        config={{ file: { attributes: { controlsList: 'nodownload' } } }}
        controls={true}
        width={width}
        height={height}
      />
    </div>
  );
}

export default dynamic(() => Promise.resolve(VideoPlayer), { ssr: false });
