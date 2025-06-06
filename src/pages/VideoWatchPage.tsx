import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import VideoPlayer from '@/components/VideoPlayer';
import CommentThread from '@/components/CommentThread';
import VideoThumbnailCard from '@/components/VideoThumbnailCard';
import Footer from '@/components/layout/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThumbsUp, ThumbsDown, Share2, ListPlus, Bell } from 'lucide-react';

const placeholderRelatedVideos = [
  { videoId: 'rel001', title: 'Related Video 1: More Adventures', thumbnailUrl: 'https://source.unsplash.com/random/320x180?adventure,nature&sig=r1', channelName: 'AdventureMax', views: '500K views', uploadedAt: '1 day ago', duration: '10:00' },
  { videoId: 'rel002', title: 'Related Video 2: Deep Dive', thumbnailUrl: 'https://source.unsplash.com/random/320x180?tech,deepdive&sig=r2', channelName: 'TechGuru', views: '1.1M views', uploadedAt: '3 days ago', duration: '18:20' },
  { videoId: 'rel003', title: 'Related Video 3: Quick Tips', thumbnailUrl: 'https://source.unsplash.com/random/320x180?tips,tricks&sig=r3', channelName: 'QuickHacks', views: '300K views', uploadedAt: '6 hours ago', duration: '05:30' },
];

const sampleComments = [
    { id: 'c1', authorName: 'User123', authorAvatarUrl: 'https://source.unsplash.com/random/40x40?avatar&sig=u1', text: 'Great video, thanks for sharing!', timestamp: '2 hours ago', likes: 15, replies: [
        { id: 'c1r1', authorName: 'CreatorChannel', authorAvatarUrl: 'https://source.unsplash.com/random/40x40?avatar&sig=cc', text: 'Glad you liked it!', timestamp: '1 hour ago', likes: 5 }
    ]},
    { id: 'c2', authorName: 'AnotherViewer', authorAvatarUrl: 'https://source.unsplash.com/random/40x40?avatar&sig=u2', text: 'Very informative content.', timestamp: '5 hours ago', likes: 8 },
];

const VideoWatchPage: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  console.log(`VideoWatchPage loaded for videoId: ${videoId}`);
  
  const [comments, setComments] = useState(sampleComments);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handlePostComment = (text: string, parentId?: string) => {
    const newComment = {
      id: `c${Date.now()}`,
      authorName: 'CurrentUser', // Replace with actual user
      authorAvatarUrl: 'https://source.unsplash.com/random/40x40?avatar&sig=curr',
      text,
      timestamp: 'Just now',
      likes: 0,
      replies: []
    };
    if (parentId) {
      setComments(prevComments => prevComments.map(c => 
        c.id === parentId ? { ...c, replies: [...(c.replies || []), newComment] } : c
      ));
    } else {
      setComments(prevComments => [newComment, ...prevComments]);
    }
  };

  // Mock video data based on videoId or default
  const currentVideo = {
    title: `Video Title for ${videoId}`,
    description: "This is a detailed description of the video. It can be quite long and include various details about the content, timestamps, links, and more. \n\n ## Key Moments: \n0:00 - Intro \n2:30 - Main Topic \n5:00 - Conclusion.",
    uploaderName: 'CreatorChannel',
    uploaderAvatarUrl: 'https://source.unsplash.com/random/40x40?avatar&sig=cc',
    views: '1.5M views',
    uploadDate: 'Jan 1, 2024',
    likes: 12000,
    dislikes: 300,
    videoSrc: `https://www.youtube.com/watch?v=${videoId || 'dQw4w9WgXcQ'}` // Default if no ID
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-2 py-4 lg:px-0">
        <div className="lg:flex lg:space-x-4">
          {/* Main content: Video Player and Info */}
          <div className="lg:w-2/3">
            <VideoPlayer src={currentVideo.videoSrc} title={currentVideo.title} autoplay />
            
            <div className="py-4">
              <h1 className="text-2xl font-bold mb-2">{currentVideo.title}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground mb-3">
                <span>{currentVideo.views} &bull; {currentVideo.uploadDate}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b">
                <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                  <Avatar>
                    <AvatarImage src={currentVideo.uploaderAvatarUrl} alt={currentVideo.uploaderName} />
                    <AvatarFallback>{currentVideo.uploaderName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{currentVideo.uploaderName}</p>
                    <p className="text-xs text-muted-foreground">1.2M subscribers</p> {/* Placeholder */}
                  </div>
                  <Button variant={isSubscribed ? "secondary" : "default"} size="sm" onClick={() => setIsSubscribed(!isSubscribed)}>
                     {isSubscribed ? <><Bell className="mr-2 h-4 w-4" /> Subscribed</> : "Subscribe"}
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm"><ThumbsUp className="mr-1 h-4 w-4" /> {currentVideo.likes.toLocaleString()}</Button>
                  <Button variant="ghost" size="sm"><ThumbsDown className="mr-1 h-4 w-4" /> {currentVideo.dislikes.toLocaleString()}</Button>
                  <Button variant="ghost" size="sm"><Share2 className="mr-1 h-4 w-4" /> Share</Button>
                  <Button variant="ghost" size="sm"><ListPlus className="mr-1 h-4 w-4" /> Save</Button>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full mt-3 bg-muted/50 rounded-md p-3">
                <AccordionItem value="item-1" className="border-b-0">
                  <AccordionTrigger className="text-sm font-semibold hover:no-underline">Show Description</AccordionTrigger>
                  <AccordionContent className="text-sm whitespace-pre-line">
                    {currentVideo.description}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="mt-6">
              <CommentThread comments={comments} onPostComment={handlePostComment} currentUserId="CurrentUser" />
            </div>
          </div>

          {/* Sidebar: Related Videos */}
          <div className="lg:w-1/3 mt-6 lg:mt-0">
            <Tabs defaultValue="related" className="w-full">
              <TabsList className="grid w-full grid-cols-1"> {/* Simplified to just one tab for now */}
                <TabsTrigger value="related">Up Next</TabsTrigger>
              </TabsList>
              <TabsContent value="related">
                <div className="space-y-3 py-3">
                  {placeholderRelatedVideos.map(video => (
                    <VideoThumbnailCard key={video.videoId} {...video} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VideoWatchPage;