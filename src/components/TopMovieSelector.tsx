import { useState } from 'react';
import { useMovieSearch } from '@/hooks';
import { Movie } from '@/types';
import Spinner from './Spinner';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';

interface TopMovieSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelectMovie: (movie: Movie) => void;
  rankPosition: number;
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
};

export default function TopMovieSelector({
  open,
  onClose,
  onSelectMovie,
  rankPosition
}: TopMovieSelectorProps) {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { movies, isLoading, error } = useMovieSearch(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchQuery(query);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    onSelectMovie(movie);
    setQuery('');
    setSearchQuery('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" gutterBottom>
          Select Movie for Rank #{rankPosition}
        </Typography>

        <form onSubmit={handleSearch}>
          <TextField
            fullWidth
            label="Search for a movie..."
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ mb: 3 }}
            autoFocus
          />
        </form>

        {isLoading && <Spinner />}
        {error && <Typography color="error">Failed to load search results.</Typography>}

        {movies && movies.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {movies.map(movie => (
              <Card
                key={movie.id}
                sx={{
                  display: 'flex',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
                onClick={() => handleSelectMovie(movie)}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 100 }}
                  image={movie.posterURL ? `https://image.tmdb.org/t/p/w500${movie.posterURL}` : '/placeholder.png'}
                  alt={movie.title}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {movie.overview}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          searchQuery && !isLoading && (
            <Typography>No results found. Try a different search.</Typography>
          )
        )}
      </Box>
    </Modal>
  );
}
