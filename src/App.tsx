import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import VideoWatchPage from "./pages/VideoWatchPage";
import ChannelPage from "./pages/ChannelPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import UploadPage from "./pages/UploadPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/watch/:videoId" element={<VideoWatchPage />} />
          <Route path="/channel/:channelName" element={<ChannelPage />} /> {/* Using channelName as per component structure */}
          <Route path="/results" element={<SearchResultsPage />} />
          <Route path="/upload" element={<UploadPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;