import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, MessageSquare } from 'lucide-react'; // Icons

interface Comment {
  id: string;
  authorName: string;
  authorAvatarUrl?: string;
  text: string;
  timestamp: string; // e.g., "2 hours ago" or Date object
  likes: number;
  replies?: Comment[]; // Nested replies
}

interface CommentThreadProps {
  comments: Comment[];
  onPostComment: (text: string, parentId?: string) => void; // parentId for replies
  currentUserId?: string; // To identify user's own comments for editing/deleting
}

const CommentItem: React.FC<{ comment: Comment; onReply: (commentId: string) => void }> = ({ comment, onReply }) => {
  return (
    <div className="flex space-x-3 py-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.authorAvatarUrl} alt={comment.authorName} />
        <AvatarFallback>{comment.authorName.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{comment.authorName}</span>
          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
        </div>
        <p className="text-sm mt-1">{comment.text}</p>
        <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
          <Button variant="ghost" size="sm" className="p-0 h-auto hover:text-primary">
            <ThumbsUp className="h-3.5 w-3.5 mr-1" /> {comment.likes}
          </Button>
          <Button variant="ghost" size="sm" className="p-0 h-auto hover:text-primary" onClick={() => onReply(comment.id)}>
            <MessageSquare className="h-3.5 w-3.5 mr-1" /> Reply
          </Button>
          {/* Add more actions like Edit/Delete if currentUserId matches */}
        </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 pl-6 border-l">
            {comment.replies.map(reply => <CommentItem key={reply.id} comment={reply} onReply={onReply} />)}
          </div>
        )}
      </div>
    </div>
  );
};


const CommentThread: React.FC<CommentThreadProps> = ({ comments, onPostComment }) => {
  const [newCommentText, setNewCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null); // ID of comment being replied to

  console.log("Rendering CommentThread with comments:", comments.length);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommentText.trim()) {
      onPostComment(newCommentText, replyingTo || undefined);
      setNewCommentText('');
      setReplyingTo(null);
      console.log("New comment posted:", newCommentText, "Replying to:", replyingTo);
    }
  };

  const handleStartReply = (commentId: string) => {
    setReplyingTo(commentId);
    // Optionally focus the textarea
    console.log("Starting reply to comment:", commentId);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
      <form onSubmit={handleSubmitComment} className="flex flex-col space-y-3">
        <Textarea
          placeholder={replyingTo ? "Write a reply..." : "Add a comment..."}
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          rows={3}
        />
        <div className="flex justify-end space-x-2">
            {replyingTo && (
                <Button variant="ghost" onClick={() => setReplyingTo(null)}>Cancel Reply</Button>
            )}
            <Button type="submit" disabled={!newCommentText.trim()}>
                {replyingTo ? "Post Reply" : "Post Comment"}
            </Button>
        </div>
      </form>

      <div className="divide-y">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} onReply={handleStartReply} />
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground py-4">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};
export default CommentThread;