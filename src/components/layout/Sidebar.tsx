import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Home, Compass, Users, Video as VideoIcon } from 'lucide-react'; // Example icons

interface SidebarProps {
  // Props can be added if the sidebar content needs to be dynamic
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  console.log("Rendering Sidebar");

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/explore", label: "Explore", icon: Compass },
    { href: "/subscriptions", label: "Subscriptions", icon: VideoIcon },
    { href: "/library", label: "Library", icon: Users },
    // Add more items as needed
  ];

  return (
    <aside className={`h-screen sticky top-14 border-r bg-background hidden md:block md:w-60 lg:w-64 p-4 ${className}`}>
      <ScrollArea className="h-[calc(100vh-5rem)] pr-3"> {/* Adjust height considering header */}
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              // Add activeClassName or similar logic for active state
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        {/* You can add more sections to the sidebar here, e.g., Playlists, Subscribed Channels */}
      </ScrollArea>
    </aside>
  );
};
export default Sidebar;