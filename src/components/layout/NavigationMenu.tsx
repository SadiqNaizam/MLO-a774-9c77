import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // For mobile menu
import { Menu, Search, Upload, UserCircle, Video } from 'lucide-react';

const NavigationMenu: React.FC = () => {
  console.log("Rendering NavigationMenu (Site Header)");
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page, e.g., using react-router-dom's useNavigate
      console.log("Performing search for:", searchQuery);
      // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Video className="h-6 w-6 text-primary" />
            <span className="font-bold">VidPlatform</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {/* Add more navigation links here if needed */}
            {/* <Link to="/explore" className="transition-colors hover:text-foreground/80 text-foreground/60">Explore</Link> */}
          </nav>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <Video className="h-6 w-6 text-primary" />
                <span className="font-bold">VidPlatform</span>
              </Link>
              <div className="flex flex-col space-y-3">
                {/* Mobile Nav Links */}
                <Link to="/upload" className="text-sm hover:underline">Upload Video</Link>
                <Link to="/profile" className="text-sm hover:underline">My Profile</Link>
                {/* Add more mobile links here */}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Search Bar - Centered */}
        <div className="flex-1 flex justify-center px-4">
          <form onSubmit={handleSearchSubmit} className="w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search videos..."
                className="w-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          <Link to="/upload">
            <Button variant="ghost" size="icon" aria-label="Upload Video">
              <Upload className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/profile">
             {/* Replace with Avatar component if user is logged in */}
            <Button variant="ghost" size="icon" aria-label="My Profile">
              <UserCircle className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
export default NavigationMenu;