'use client';

import { useTrendingMovies } from '@/hooks';
import MovieCard from '@/components/MovieCard';
import Spinner from '@/components/Spinner';
import SearchBar from '@/components/SearchBar';
import { Container, Typography, Box } from '@mui/material';

export default function HomePage() {
  const { movies: trendingMovies, isLoading: isTrendingLoading } = useTrendingMovies();

  return (
    <Container component="main" maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Find Your Next Movie
      </Typography>
      
      <SearchBar />

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          Trending This Week
        </Typography>
        {isTrendingLoading && <Spinner />}
        {trendingMovies && trendingMovies.length > 0 ? (
          trendingMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          !isTrendingLoading && <Typography>No trending movies found.</Typography>
        )}
      </Box>
    </Container>
  );
}