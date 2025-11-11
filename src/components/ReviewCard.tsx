import { useState } from 'react';
import { MovieReview } from '@/types';
import { Paper, Typography, Box, Button } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import ReviewWithRepliesModal from './ReviewWithRepliesModal';

interface ReviewCardProps {
    review: MovieReview;
    userName?: string;
    onReplyCreated?: () => void;
}

export default function ReviewCard({ review, userName, onReplyCreated }: ReviewCardProps) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle2" component="p">
                    User: {userName || review.userId}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    {review.text}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="caption" color="text.secondary" suppressHydrationWarning>
                        Posted on: {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                    <Button
                        size="small"
                        startIcon={<ReplyIcon />}
                        onClick={handleOpenModal}
                        variant="outlined"
                    >
                        Reply {review.replyCount !== undefined && review.replyCount > 0 && `(${review.replyCount})`}
                    </Button>
                </Box>
            </Paper>

            <ReviewWithRepliesModal
                review={review}
                open={modalOpen}
                onClose={handleCloseModal}
                reviewerName={userName}
                onReplyCreated={onReplyCreated}
            />
        </>
    );
}