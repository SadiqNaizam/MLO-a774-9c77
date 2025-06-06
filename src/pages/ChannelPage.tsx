import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import ChannelHeader from '@/components/ChannelHeader';
import VideoThumbnailCard from '@/components/VideoThumbnailCard';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
// Button is used within ChannelHeader

const placeholderChannelVideos = [
  { videoId: 'chanVid001', title: 'Channel Highlight: Best Moments', thumbnailUrl: 'https://source.unsplash.com/random/320x180?channel,highlight&sig=cv1', channelName: 'This Channel', views: '50K views', uploadedAt: '1 day ago', duration: '05:45' },
  { videoId: 'chanVid002', title: 'Latest Upload from Us!', thumbnailUrl: 'https://source.unsplash.com/random/320x180?channel,new&sig=cv2', channelName: 'This Channel', views: '22K views', uploadedAt: '3 days ago', duration: '12:10' },
  { videoId: 'chanVid003', title: 'Tutorial Series Part 1', thumbnailUrl: 'https://source.unsplash.com/random/320x180?channel,tutorial&sig=cv3', channelName: 'This Channel', views: '105K views', uploadedAt: '1 week ago', duration: '30:00' },
  { videoId: 'chanVid004', title: 'Behind The Scenes', thumbnailUrl: 'https://source.unsplash.com/random/320x180?channel,bts&sig=cv4', channelName: 'This Channel', views: '12K views', uploadedAt: '2 weeks ago', duration: '07:30' },
];

const ChannelPage: React.FC = () => {
  const { channelName } = useParams<{ channelName: string }>(); // Or channelId
  console.log(`ChannelPage loaded for channel: ${channelName}`);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const resolvedChannelName = channelName || "Default Channel";

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow">
        <ChannelHeader
          channelName={resolvedChannelName}
          channelAvatarUrl={`https://source.unsplash.com/random/128x128?avatar,${resolvedChannelName}&sig=chAv`}
          subscribersCount="1.2M subscribers"
          bannerImageUrl={`https://source.unsplash.com/random/1500x300?banner,${resolvedChannelName}&sig=chBn`}
          isSubscribed={isSubscribed}
          isVerified={true}
          onSubscribeToggle={() => setIsSubscribed(!isSubscribed)}
        />
        <div className="container mx-auto px-4 py-6">
          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="border-b">
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            <TabsContent value="home" className="pt-6">
                <h2 className="text-xl font-semibold mb-3">Featured Content</h2>
                {/* Usually a featured video or playlist */}
                {placeholderChannelVideos.length > 0 && <VideoThumbnailCard {...placeholderChannelVideos[0]} channelName={resolvedChannelName} />}
            </TabsContent>
            <TabsContent value="videos" className="pt-6">
              <h2 className="text-xl font-semibold mb-3">All Uploads</h2>
              <ScrollArea className="h-[calc(100vh-20rem)]"> {/* Adjust height as needed */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {placeholderChannelVideos.map(video => (
                    <VideoThumbnailCard key={video.videoId} {...video} channelName={resolvedChannelName} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="playlists" className="pt-6">
              <p>Playlists content will go here.</p>
            </TabsContent>
            <TabsContent value="community" className="pt-6">
              <p>Community posts will go here.</p>
            </TabsContent>
            <TabsContent value="about" className="pt-6">
              <p>About {resolvedChannelName}: Information about the channel, join date, total views, etc.</p>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChannelPage;