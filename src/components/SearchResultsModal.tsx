import { useMovieSearch } from '@/hooks';
import Spinner from './Spinner';
import { Modal, Box, Typography } from '@mui/material';
import MovieCard from './MovieCard';

interface SearchResultsModalProps {
  query: string;
  open: boolean;
  onClose: () => void;
}

const style = {
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

export default function SearchResultsModal({ query, open, onClose }: SearchResultsModalProps) {
  const { movies, isLoading, error } = useMovieSearch(query);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          Search Results for &quot;{query}&quot;
        </Typography>
        {isLoading && <Spinner />}
        {error && <Typography color="error">Failed to load search results.</Typography>}
        {movies && movies.length > 0 ? (
          movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          !isLoading && <Typography>No results found.</Typography>
        )}
      </Box>
    </Modal>
  );
}