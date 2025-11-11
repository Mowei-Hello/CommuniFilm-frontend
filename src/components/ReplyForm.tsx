import { useState, FormEvent } from 'react';
import { useReplyMutations } from '@/hooks';
import { Box, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import toast from 'react-hot-toast';
import Spinner from './Spinner';

interface ReplyFormProps {
  reviewId: string;
  movieId: number;
  onSuccess: () => void;
}

export default function ReplyForm({ reviewId, movieId, onSuccess }: ReplyFormProps) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createReply } = useReplyMutations(reviewId);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error('Reply cannot be empty.');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Posting your reply...');

    try {
      await createReply(text, movieId);
      toast.success('Reply posted!', { id: toastId });
      setText('');
      onSuccess(); // Refresh replies
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to post reply.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Write a reply..."
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isSubmitting}
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        startIcon={isSubmitting ? <Spinner size={20} /> : <SendIcon />}
      >
        {isSubmitting ? 'Posting...' : 'Post Reply'}
      </Button>
    </Box>
  );
}
