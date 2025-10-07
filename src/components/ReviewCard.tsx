import { MovieReview } from '@/types';
import { Paper, Typography } from '@mui/material';

interface ReviewCardProps {
    review: MovieReview;
    userName?: string;
}

export default function ReviewCard({ review, userName }: ReviewCardProps) {
    return (
        <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" component="p">
                User: {userName || review.userId}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
                {review.text}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Posted on: {new Date(review.createdAt).toLocaleDateString()}
            </Typography>
        </Paper>
    );
}