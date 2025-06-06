import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // For upload progress
import { UploadCloud } from 'lucide-react';

const videoUploadSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title too long"),
  description: z.string().max(5000, "Description too long").optional(),
  videoFile: z.instanceof(FileList).refine(files => files?.length === 1, "A video file is required."),
  thumbnailFile: z.instanceof(FileList).optional(), // Can be optional, server might generate
  visibility: z.enum(["public", "private", "unlisted"]).default("public"),
  tags: z.string().optional(), // Comma-separated or allow user to add multiple
});

type VideoUploadFormData = z.infer<typeof videoUploadSchema>;

interface VideoUploadFormProps {
  onSubmit: (data: VideoUploadFormData) => Promise<void>;
  uploadProgress?: number; // Percentage 0-100
}

const VideoUploadForm: React.FC<VideoUploadFormProps> = ({ onSubmit, uploadProgress }) => {
  console.log("Rendering VideoUploadForm");
  const { register, handleSubmit, control, formState: { errors, isSubmitting }, watch } = useForm<VideoUploadFormData>({
    resolver: zodResolver(videoUploadSchema),
  });

  const videoFile = watch("videoFile");
  const selectedFileName = videoFile && videoFile.length > 0 ? videoFile[0].name : "No file selected";

  const handleFormSubmit = async (data: VideoUploadFormData) => {
    console.log("Submitting video upload form:", data);
    await onSubmit(data);
    // Reset form or show success message
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload New Video</CardTitle>
        <CardDescription>Share your amazing content with the world.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardContent className="space-y-6">
          {/* Video File Input */}
          <div>
            <Label htmlFor="videoFile" className="mb-2 block">Video File*</Label>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="videoFile-input" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="mb-1 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">MP4, MOV, AVI, etc. (MAX. 2GB)</p>
                        {selectedFileName !== "No file selected" && <p className="text-xs text-primary mt-1">{selectedFileName}</p>}
                    </div>
                    <Input id="videoFile-input" type="file" className="hidden" {...register('videoFile')} accept="video/*" />
                </label>
            </div>
            {errors.videoFile && <p className="text-red-500 text-xs mt-1">{errors.videoFile.message}</p>}
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title">Title*</Label>
            <Input id="title" {...register('title')} />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register('description')} rows={5} />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>
          
          {/* Thumbnail (Optional) */}
          <div>
            <Label htmlFor="thumbnailFile">Custom Thumbnail (Optional)</Label>
            <Input id="thumbnailFile" type="file" {...register('thumbnailFile')} accept="image/*" />
            {errors.thumbnailFile && <p className="text-red-500 text-xs mt-1">{errors.thumbnailFile.message}</p>}
          </div>

          {/* Visibility */}
          <div>
            <Label htmlFor="visibility">Visibility*</Label>
            <Controller
              name="visibility"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id="visibility">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="unlisted">Unlisted</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.visibility && <p className="text-red-500 text-xs mt-1">{errors.visibility.message}</p>}
          </div>

          {/* Tags (Optional) */}
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input id="tags" {...register('tags')} placeholder="e.g., gaming, tutorial, vlog" />
            {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags.message}</p>}
          </div>
          
          {/* Upload Progress */}
          {typeof uploadProgress === 'number' && (
            <div>
              <Label>Upload Progress</Label>
              <Progress value={uploadProgress} className="w-full mt-1" />
              <p className="text-xs text-muted-foreground mt-1">{uploadProgress}% uploaded</p>
            </div>
          )}

        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || typeof uploadProgress === 'number' && uploadProgress < 100}>
            {isSubmitting ? 'Uploading...' : (typeof uploadProgress === 'number' && uploadProgress < 100 ? 'Processing...' : 'Upload Video')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default VideoUploadForm;