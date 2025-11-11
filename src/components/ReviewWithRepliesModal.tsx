import { MovieReview } from '@/types';
import { useReplies } from '@/hooks';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ReplyItem from './ReplyItem';
import ReplyForm from './ReplyForm';
import Spinner from './Spinner';

interface ReviewWithRepliesModalProps {
  review: MovieReview;
  open: boolean;
  onClose: () => void;
  reviewerName?: string;
  onReplyCreated?: () => void;
}

export default function ReviewWithRepliesModal({
  review,
  open,
  onClose,
  reviewerName = 'Anonymous',
  onReplyCreated,
}: ReviewWithRepliesModalProps) {
  const { replies, isLoading, mutate } = useReplies(open ? review.reviewId : null);

  const handleReplySuccess = () => {
    mutate(); // Refresh replies
    onReplyCreated?.(); // Refresh parent review list to update count
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            maxHeight: '90vh',
          },
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box component="span" sx={{ fontSize: '1.25rem', fontWeight: 500 }}>
          Review & Replies
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: 'text.secondary',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* Original Review */}
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 3,
            bgcolor: 'background.default',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.main' }}>
              {reviewerName}
            </Typography>
            <Typography variant="caption" color="text.secondary" suppressHydrationWarning>
              {new Date(review.createdAt).toLocaleDateString()}
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {review.text}
          </Typography>
        </Paper>

        <Divider sx={{ my: 2 }} />

        {/* Replies Section */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Replies ({replies?.length || 0})
        </Typography>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <Spinner />
          </Box>
        ) : replies && replies.length > 0 ? (
          <Box sx={{ mb: 3 }}>
            {replies.map((reply) => (
              <ReplyItem key={reply.replyId} reply={reply} />
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontStyle: 'italic' }}>
            No replies yet. Be the first to reply!
          </Typography>
        )}

        {/* Reply Form */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
          Add a Reply
        </Typography>
        <ReplyForm
          reviewId={review.reviewId}
          movieId={review.movieId}
          onSuccess={handleReplySuccess}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
