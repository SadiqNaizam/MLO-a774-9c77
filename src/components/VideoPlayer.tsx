import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface VideoPlayerProps {
  src: string; // URL of the video
  title?: string;
  autoplay?: boolean;
  controls?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title = "Video playback",
  autoplay = false,
  controls = true,
}) => {
  console.log("Rendering VideoPlayer with src:", src);

  // This is a basic HTML5 video player. For robust needs (adaptive streaming, etc.),
  // consider libraries like Plyr.io, Video.js, or specific platform SDKs (e.g., YouTube iframe API).
  return (
    <div className="w-full bg-black rounded-lg overflow-hidden">
      <AspectRatio ratio={16 / 9}>
        {src.includes("youtube.com") || src.includes("youtu.be") ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${extractYouTubeID(src)}${autoplay ? '?autoplay=1' : ''}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        ) : (
          <video
            src={src}
            title={title}
            autoPlay={autoplay}
            controls={controls}
            className="w-full h-full object-contain"
            onPlay={() => console.log("Video playing:", src)}
            onError={(e) => console.error("Video player error:", e)}
          >
            Your browser does not support the video tag.
          </video>
        )}
      </AspectRatio>
    </div>
  );
};

// Helper to extract YouTube video ID from various URL formats
const extractYouTubeID = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

export default VideoPlayer;