import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Sidebar from '@/components/layout/Sidebar';
import VideoThumbnailCard from '@/components/VideoThumbnailCard';
import Footer from '@/components/layout/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';

const placeholderVideos = [
  { videoId: 'vid001', title: 'Exploring the Mountains', thumbnailUrl: 'https://source.unsplash.com/random/320x180?nature,mountains&sig=1', channelName: 'Nature Explorers', channelAvatarUrl: 'https://source.unsplash.com/random/40x40?avatar,nature&sig=c1', views: '1.2M views', uploadedAt: '2 days ago', duration: '12:34' },
  { videoId: 'vid002', title: 'Ultimate Gaming Setup 2024', thumbnailUrl: 'https://source.unsplash.com/random/320x180?gaming,setup&sig=2', channelName: 'GamerTech', channelAvatarUrl: 'https://source.unsplash.com/random/40x40?avatar,gaming&sig=c2', views: '800K views', uploadedAt: '5 days ago', duration: '08:15' },
  { videoId: 'vid003', title: 'Delicious Pasta Recipe', thumbnailUrl: 'https://source.unsplash.com/random/320x180?food,pasta&sig=3', channelName: 'Chef Kitchen', channelAvatarUrl: 'https://source.unsplash.com/random/40x40?avatar,food&sig=c3', views: '2.5M views', uploadedAt: '1 week ago', duration: '15:02' },
  { videoId: 'vid004', title: 'Learning React in 1 Hour', thumbnailUrl: 'https://source.unsplash.com/random/320x180?coding,react&sig=4', channelName: 'CodeMaster', channelAvatarUrl: 'https://source.unsplash.com/random/40x40?avatar,code&sig=c4', views: '500K views', uploadedAt: '3 days ago', duration: '59:30' },
  { videoId: 'vid005', title: 'Travel Vlog: Tokyo Adventures', thumbnailUrl: 'https://source.unsplash.com/random/320x180?travel,tokyo&sig=5', channelName: 'Wanderlust Life', channelAvatarUrl: 'https://source.unsplash.com/random/40x40?avatar,travel&sig=c5', views: '1.8M views', uploadedAt: '10 days ago', duration: '22:10' },
];

const Homepage: React.FC = () => {
  console.log('Homepage loaded');
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <div className="flex flex-1">
        <Sidebar className="fixed top-14 h-[calc(100vh-3.5rem)]" /> {/* Ensure sidebar is fixed and height adjusted */}
        <main className="flex-1 md:ml-60 lg:ml-64 pt-4 pb-8"> {/* Add ml to account for fixed sidebar width */}
          <ScrollArea className="h-full px-4">
            <div className="container mx-auto">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Recommended Videos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {placeholderVideos.map(video => (
                    <VideoThumbnailCard key={video.videoId} {...video} />
                  ))}
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-4">Trending Now</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[...placeholderVideos].reverse().slice(0,4).map(video => ( // Example of different set
                    <VideoThumbnailCard key={video.videoId + "-trending"} {...video} thumbnailUrl={`${video.thumbnailUrl}&trending=true`} />
                  ))}
                </div>
              </section>
            </div>
          </ScrollArea>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;