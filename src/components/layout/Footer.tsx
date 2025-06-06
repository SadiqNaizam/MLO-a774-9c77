import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Youtube } from 'lucide-react'; // Example social icons

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>&copy; {currentYear} VidPlatform. All rights reserved.</p>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/terms" className="hover:text-foreground">Terms</Link>
          <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
          {/* Social Icons */}
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground"><Youtube className="h-5 w-5" /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground"><Twitter className="h-5 w-5" /></a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground"><Github className="h-5 w-5" /></a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;