'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useMovieDetail, useMovieReviews } from '@/hooks';
import { useUsers } from '@/hooks/useUsers'; // Import the new hook
import Spinner from '@/components/Spinner';
import ReviewCard from '@/components/ReviewCard';
import { Container, Typography, Box, Paper } from '@mui/material';
import ReviewForm from '@/components/ReviewForm';

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = Array.isArray(params.movieId) ? params.movieId[0] : params.movieId;

  if (!movieId) {
    return <Typography sx={{ textAlign: 'center', mt: 4 }}>Invalid movie ID.</Typography>;
  }

  const { movie, isLoading: isMovieLoading, error: movieError } = useMovieDetail(movieId);
  const { reviews, isLoading: areReviewsLoading, error: reviewsError } = useMovieReviews(movieId);

  // Get all unique user IDs from the reviews
  const userIds = useMemo(() => {
    if (!reviews) return [];
    const ids = reviews.map(review => review.userId);
    return [...new Set(ids)];
  }, [reviews]);

  // Fetch the user profiles for all reviewers
  const { users, isLoading: areUsersLoading } = useUsers(userIds);

  // Create a map from userId to displayName for easy lookup
  const userMap = useMemo(() => {
    if (!users) return new Map<string, string>();
    return users.reduce((acc, user) => {
      acc.set(user.uid, user.displayName);
      return acc;
    }, new Map<string, string>());
  }, [users]);


  if (isMovieLoading || areReviewsLoading || areUsersLoading) {
    return <Spinner fullPage />;
  }

  if (movieError || !movie) {
    return <Typography sx={{ textAlign: 'center', mt: 4 }}>Movie not found.</Typography>;
  }

  const imageUrl = movie.posterURL
    ? `https://image.tmdb.org/t/p/w780${movie.posterURL}`
    : '/placeholder.png';

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 2, display: { md: 'flex' }, gap: 3 }}>
        <Box
          component="img"
          src={imageUrl}
          alt={movie.title}
          sx={{
            width: { xs: '100%', md: 300 },
            height: 'auto',
            objectFit: 'cover',
            borderRadius: 2,
          }}
        />
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Release Date: {new Date(movie.release_date).toLocaleDateString()} | Rating: {movie.vote_average.toFixed(1)}/10
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {movie.overview}
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Reviews
        </Typography>

        <ReviewForm movieId={movieId} />

        <Box sx={{ mt: 4 }}>
            {reviewsError && <Typography color="error">Could not load reviews.</Typography>}
            {reviews && reviews.length > 0 ? (
            reviews.map(review => (
                <ReviewCard 
                key={review.reviewId} 
                review={review} 
                userName={userMap.get(review.userId)} // Pass the user's name
                />
            ))
            ) : (
            !areReviewsLoading && <Typography>No reviews for this movie yet.</Typography>
            )}
        </Box>
      </Box>
    </Container>
  );
}