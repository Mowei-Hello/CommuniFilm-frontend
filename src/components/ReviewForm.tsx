'use client';

import { useState, FormEvent } from 'react';
import { useReviewMutations } from '@/hooks';
import { Box, TextField, Button } from '@mui/material';
import toast from 'react-hot-toast';
import Spinner from './Spinner';

interface ReviewFormProps {
  movieId: string;
}

export default function ReviewForm({ movieId }: ReviewFormProps) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createReview } = useReviewMutations(movieId);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error('Review cannot be empty.');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Posting your review...');

    try {
      await createReview(text);
      toast.success('Review posted!', { id: toastId });
      setText(''); // Clear the input box on success
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to post review.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Write a review..."
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isSubmitting}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        {isSubmitting ? <Spinner size={24} /> : 'Submit Review'}
      </Button>
    </Box>
  );
}