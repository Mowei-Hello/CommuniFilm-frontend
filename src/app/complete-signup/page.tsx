'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useUserMutations } from '@/hooks';
import { useRouter } from 'next/navigation';
import { useState, FormEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import Spinner from '@/components/Spinner';
import TopMovieSelector from '@/components/TopMovieSelector';
import TopMovieCard from '@/components/TopMovieCard';
import { Button, TextField, Box, Typography, Container, Paper } from '@mui/material';
import { FavoriteMovie, TopMovieInput, Movie } from '@/types';

export default function CompleteSignupPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { updateUserProfile } = useUserMutations();
  const router = useRouter();
  const [bio, setBio] = useState('');
  const [topMovies, setTopMovies] = useState<FavoriteMovie[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
    }
  }, [user, isAuthLoading, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading('Saving your profile...');

    try {
      const payload: { bio: string; topMovies?: TopMovieInput[] } = { bio };

      if (topMovies.length > 0) {
        payload.topMovies = topMovies.map(movie => ({
          rank: movie.rank,
          movieId: movie.movieId,
        }));
      }

      await updateUserProfile(payload);
      toast.success('Profile saved successfully!', { id: toastId });
      router.push('/');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'An unknown error occurred.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    router.push('/');
  };

  const handleAddMovie = (movie: Movie) => {
    const favoriteMovie: FavoriteMovie = {
      rank: nextAvailableRank || 1,
      movieId: movie.id,
      title: movie.title,
      posterURL: movie.posterURL,
      overview: movie.overview,
    };
    setTopMovies([...topMovies, favoriteMovie]);
    setIsSelectorOpen(false);
  };

  const handleRemoveMovie = (rank: number) => {
    setTopMovies(topMovies.filter(m => m.rank !== rank));
  };

  const nextAvailableRank = topMovies.length < 3 ? topMovies.length + 1 : null;

  if (isAuthLoading || !user) {
    return <Spinner fullPage />;
  }

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Complete Your Profile
        </Typography>
        <Typography component="p" sx={{ mt: 1, mb: 4, textAlign: 'center' }}>
          Welcome, {user.displayName}! Tell us a bit about yourself and pick your top 3 movies.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          {/* Bio Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              About You
            </Typography>
            <TextField
              id="bio"
              label="Your Bio"
              multiline
              rows={4}
              fullWidth
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={isSubmitting}
              variant="outlined"
              placeholder="Tell us about yourself..."
            />
          </Paper>

          {/* Top Movies Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Top 3 Movies (Optional)
            </Typography>

            {topMovies.length > 0 && (
              <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                {topMovies
                  .sort((a, b) => a.rank - b.rank)
                  .map((movie) => (
                    <TopMovieCard
                      key={movie.rank}
                      movie={movie}
                      onRemove={() => handleRemoveMovie(movie.rank)}
                    />
                  ))}
              </Box>
            )}

            {nextAvailableRank && (
              <Button
                variant="outlined"
                onClick={() => setIsSelectorOpen(true)}
                disabled={isSubmitting}
                fullWidth
              >
                Add Movie #{nextAvailableRank}
              </Button>
            )}

            {topMovies.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                No movies selected yet. Click the button above to add your favorites!
              </Typography>
            )}
          </Paper>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{ minWidth: 150 }}
            >
              {isSubmitting ? <Spinner size={24} /> : 'Save Profile'}
            </Button>
            <Button
              variant="outlined"
              onClick={handleSkip}
              disabled={isSubmitting}
              sx={{ minWidth: 150 }}
            >
              Skip for now
            </Button>
          </Box>
        </Box>
      </Box>

      <TopMovieSelector
        open={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        onSelectMovie={handleAddMovie}
        rankPosition={nextAvailableRank || 1}
      />
    </Container>
  );
}