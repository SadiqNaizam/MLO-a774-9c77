import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // For channel avatar

interface VideoThumbnailCardProps {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  channelName: string;
  channelAvatarUrl?: string;
  views: string; // e.g., "1.2M views"
  uploadedAt: string; // e.g., "2 days ago"
  duration?: string; // e.g., "12:34"
}

const VideoThumbnailCard: React.FC<VideoThumbnailCardProps> = ({
  videoId,
  title,
  thumbnailUrl,
  channelName,
  channelAvatarUrl,
  views,
  uploadedAt,
  duration,
}) => {
  console.log("Rendering VideoThumbnailCard for:", title);

  return (
    <Link to={`/watch/${videoId}`} className="block group">
      <Card className="overflow-hidden border-0 shadow-none rounded-lg">
        <CardContent className="p-0">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden relative">
            <img
              src={thumbnailUrl || '/placeholder.svg'}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
            {duration && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                {duration}
              </div>
            )}
          </AspectRatio>
          <div className="pt-3 flex space-x-3">
            <Link to={`/channel/${channelName}`} className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
              <Avatar className="h-9 w-9">
                <AvatarImage src={channelAvatarUrl} alt={channelName} />
                <AvatarFallback>{channelName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h3 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary">
                {title}
              </h3>
              <Link to={`/channel/${channelName}`} onClick={(e) => e.stopPropagation()} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {channelName}
              </Link>
              <p className="text-xs text-muted-foreground">
                {views} &bull; {uploadedAt}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
export default VideoThumbnailCard;