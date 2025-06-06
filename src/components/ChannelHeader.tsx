import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle } from 'lucide-react'; // Icons for verified, subscribe

interface ChannelHeaderProps {
  channelName: string;
  channelAvatarUrl?: string;
  subscribersCount: string; // e.g., "1.5M subscribers"
  bannerImageUrl?: string;
  isSubscribed: boolean;
  isVerified?: boolean;
  onSubscribeToggle: () => void;
}

const ChannelHeader: React.FC<ChannelHeaderProps> = ({
  channelName,
  channelAvatarUrl,
  subscribersCount,
  bannerImageUrl,
  isSubscribed,
  isVerified,
  onSubscribeToggle,
}) => {
  console.log("Rendering ChannelHeader for:", channelName);

  return (
    <div className="w-full">
      {/* Banner Image */}
      {bannerImageUrl && (
        <div className="h-32 md:h-48 lg:h-64 bg-muted overflow-hidden">
          <img
            src={bannerImageUrl}
            alt={`${channelName} banner`}
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if banner fails to load
          />
        </div>
      )}

      {/* Channel Info Section */}
      <div className="container py-4 md:py-6 flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background -mt-12 md:-mt-16">
          <AvatarImage src={channelAvatarUrl} alt={channelName} />
          <AvatarFallback className="text-4xl">{channelName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <h1 className="text-2xl md:text-3xl font-bold">{channelName}</h1>
            {isVerified && <CheckCircle className="h-6 w-6 text-blue-500" />}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{subscribersCount}</p>
        </div>
        <Button onClick={onSubscribeToggle} variant={isSubscribed ? "secondary" : "default"}>
          {isSubscribed ? (
            <>
              <Bell className="mr-2 h-4 w-4" /> Subscribed
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </div>
      {/* Channel Tabs (e.g., Home, Videos, Playlists, About) would typically go below this header */}
    </div>
  );
};
export default ChannelHeader;