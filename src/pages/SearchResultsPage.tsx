import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import VideoThumbnailCard from '@/components/VideoThumbnailCard';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input'; // Search input is in NavigationMenu
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Filter } from 'lucide-react';

const placeholderSearchResults = [
  { type: 'video', videoId: 'resVid001', title: 'Search Result Video 1', thumbnailUrl: 'https://source.unsplash.com/random/320x180?search,video&sig=sr1', channelName: 'SearchChan', channelAvatarUrl: 'https://source.unsplash.com/random/40x40?avatar&sig=sc1', views: '100K views', uploadedAt: '5 days ago', duration: '09:30', description: 'A video found through search.' },
  { type: 'video', videoId: 'resVid002', title: 'Another Searched Item', thumbnailUrl: 'https://source.unsplash.com/random/320x180?search,item&sig=sr2', channelName: 'ContentFinds', channelAvatarUrl: 'https://source.unsplash.com/random/40x40?avatar&sig=sc2', views: '20K views', uploadedAt: '1 day ago', duration: '14:00', description: 'Relevant content matching query.' },
  { type: 'channel', channelName: 'Creator Searchable', avatarUrl: 'https://source.unsplash.com/random/80x80?channel,logo&sig=src1', subscribers: '50K Subscribers', videoCount: '120 Videos' },
];

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10; // Example

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get('q') || 'your query');
    console.log(`SearchResultsPage loaded for query: ${params.get('q')}`);
  }, [location.search]);

  // Mock pagination
  const totalResults = placeholderSearchResults.length * 5; // Simulate more results
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Fetch new page data here
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Search Results for: "{searchQuery}"</h1>
          <div className="flex items-center space-x-2 mt-2">
            <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
            {/* Add more sort/filter buttons here */}
          </div>
        </div>

        <div className="space-y-6">
          {placeholderSearchResults.map((result, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              {result.type === 'video' && (
                <VideoThumbnailCard
                  videoId={result.videoId!}
                  title={result.title!}
                  thumbnailUrl={result.thumbnailUrl!}
                  channelName={result.channelName!}
                  channelAvatarUrl={result.channelAvatarUrl}
                  views={result.views!}
                  uploadedAt={result.uploadedAt!}
                  duration={result.duration}
                />
                // Could add description snippet here too
              )}
              {result.type === 'channel' && (
                <div className="flex items-center space-x-4 p-2 hover:bg-muted/50 rounded-md">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={result.avatarUrl} alt={result.channelName} />
                    <AvatarFallback>{result.channelName!.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{result.channelName}</h3>
                    <p className="text-sm text-muted-foreground">{result.subscribers} &bull; {result.videoCount}</p>
                    <Button variant="secondary" size="sm" className="mt-1">Visit Channel</Button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {placeholderSearchResults.length === 0 && <p>No results found for "{searchQuery}".</p>}
        </div>

        {totalPages > 1 && (
            <Pagination className="mt-8">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={(e) => {e.preventDefault(); handlePageChange(Math.max(1, currentPage - 1))}} />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => {e.preventDefault(); handlePageChange(i+1)}}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    )).slice(Math.max(0, currentPage-2), Math.min(totalPages, currentPage+1))} 
                    {/* Simplified pagination display */}
                    {totalPages > 3 && currentPage < totalPages -1 && <PaginationEllipsis />}
                     {totalPages > 3 && currentPage < totalPages -1 && (
                        <PaginationItem>
                            <PaginationLink href="#" onClick={(e) => {e.preventDefault(); handlePageChange(totalPages)}}>
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    )}
                    <PaginationItem>
                        <PaginationNext href="#" onClick={(e) => {e.preventDefault(); handlePageChange(Math.min(totalPages, currentPage + 1))}} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;