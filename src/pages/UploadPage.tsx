import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import VideoUploadForm from '@/components/VideoUploadForm';
import Footer from '@/components/layout/Footer';
// VideoUploadForm uses Card, Input, Textarea, Select, Button, Progress internally

const UploadPage: React.FC = () => {
  console.log('UploadPage loaded');
  const [uploadProgress, setUploadProgress] = useState<number | undefined>(undefined);

  const handleVideoSubmit = async (data: any) => { // data type is VideoUploadFormData from component
    console.log('Video data submitted to page:', data);
    setUploadProgress(0); // Reset/start progress

    // Simulate upload
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }
    
    alert(`Video "${data.title}" submitted! Check console for details.`);
    // Reset form or redirect after successful upload
    setUploadProgress(undefined); // Clear progress
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
        <VideoUploadForm onSubmit={handleVideoSubmit} uploadProgress={uploadProgress} />
      </main>
      <Footer />
    </div>
  );
};

export default UploadPage;