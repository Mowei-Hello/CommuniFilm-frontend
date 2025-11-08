import { useState, useEffect } from 'react';
import { FavoriteMovie, Movie, TopMovieInput } from '@/types';
import { useUserMutations } from '@/hooks';
import TopMovieCard from './TopMovieCard';
import TopMovieSelector from './TopMovieSelector';
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import toast from 'react-hot-toast';

interface TopMoviesManagerProps {
  initialTopMovies?: FavoriteMovie[];
}

export default function TopMoviesManager({ initialTopMovies = [] }: TopMoviesManagerProps) {
  const [topMovies, setTopMovies] = useState<FavoriteMovie[]>(initialTopMovies || []);
  const [isEditing, setIsEditing] = useState(false);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [selectedRank, setSelectedRank] = useState<number | null>(null);
  const [rankMenuAnchor, setRankMenuAnchor] = useState<null | HTMLElement>(null);
  const [movieToChangeRank, setMovieToChangeRank] = useState<FavoriteMovie | null>(null);

  const { updateUserProfile } = useUserMutations();

  useEffect(() => {
    setTopMovies(initialTopMovies || []);
  }, [initialTopMovies]);

  const handleAddMovie = (rank: number) => {
    setSelectedRank(rank);
    setSelectorOpen(true);
  };

  const handleSelectMovie = (movie: Movie) => {
    if (selectedRank === null) return;

    const newMovie: FavoriteMovie = {
      rank: selectedRank,
      movieId: movie.id,
      title: movie.title,
      posterURL: movie.posterURL,
      overview: movie.overview,
    };

    // Remove any existing movie at this rank
    const filteredMovies = topMovies.filter(m => m.rank !== selectedRank);
    setTopMovies([...filteredMovies, newMovie].sort((a, b) => a.rank - b.rank));
  };

  const handleRemoveMovie = (rank: number) => {
    setTopMovies(topMovies.filter(m => m.rank !== rank));
  };

  const handleChangeRank = (movie: FavoriteMovie, event: React.MouseEvent<HTMLElement>) => {
    setMovieToChangeRank(movie);
    setRankMenuAnchor(event.currentTarget);
  };

  const handleSelectNewRank = (newRank: number) => {
    if (!movieToChangeRank) return;

    const existingMovieAtNewRank = topMovies.find(m => m.rank === newRank);

    // Swap ranks if there's a movie at the new rank
    const updatedMovies = topMovies.map(m => {
      if (m.rank === movieToChangeRank.rank) {
        return { ...m, rank: newRank };
      }
      if (existingMovieAtNewRank && m.rank === newRank) {
        return { ...m, rank: movieToChangeRank.rank };
      }
      return m;
    });

    setTopMovies(updatedMovies.sort((a, b) => a.rank - b.rank));
    setRankMenuAnchor(null);
    setMovieToChangeRank(null);
  };

  const handleSave = async () => {
    const toastId = toast.loading('Saving your top movies...');

    try {
      const payload: TopMovieInput[] = topMovies.map(m => ({
        rank: m.rank,
        movieId: m.movieId,
      }));

      await updateUserProfile({ topMovies: payload });

      toast.success('Top movies updated successfully!', { id: toastId });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update top movies:', error);
      toast.error('Failed to update top movies. Please try again.', { id: toastId });
    }
  };

  const handleCancel = () => {
    setTopMovies(initialTopMovies || []);
    setIsEditing(false);
  };


  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
          My Top 3 Movies
        </Typography>

        {!isEditing ? (
          <Button
            variant="contained"
            onClick={() => setIsEditing(true)}
            startIcon={<AddIcon />}
          >
            Edit Top Movies
          </Button>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSave}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={handleCancel}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>

      {(!topMovies || topMovies.length === 0) && !isEditing ? (
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'background.default' }}>
          <Typography variant="body1" color="text.secondary">
            You haven&apos;t selected your top 3 movies yet. Click &quot;Edit Top Movies&quot; to get started!
          </Typography>
        </Paper>
      ) : (
        <Box>
          {[1, 2, 3].map(rank => {
            const movie = topMovies.find(m => m.rank === rank);
            return (
              <Box key={rank}>
                {movie ? (
                  <Box sx={{ position: 'relative' }}>
                    <TopMovieCard
                      movie={movie}
                      isEditable={isEditing}
                      onEdit={isEditing ? () => handleAddMovie(rank) : undefined}
                      onRemove={isEditing ? () => handleRemoveMovie(rank) : undefined}
                    />
                    {isEditing && (
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: 50,
                          right: 10,
                          bgcolor: 'background.paper',
                          '&:hover': { bgcolor: 'action.hover' }
                        }}
                        size="small"
                        onClick={(e) => handleChangeRank(movie, e)}
                        title="Change rank"
                      >
                        <SwapVertIcon />
                      </IconButton>
                    )}
                  </Box>
                ) : isEditing ? (
                  <Paper
                    sx={{
                      p: 3,
                      mb: 3,
                      textAlign: 'center',
                      border: '2px dashed',
                      borderColor: 'divider',
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                    onClick={() => handleAddMovie(rank)}
                  >
                    <Typography variant="h6" color="text.secondary">
                      + Add Movie for Rank #{rank}
                    </Typography>
                  </Paper>
                ) : null}
              </Box>
            );
          })}
        </Box>
      )}

      <TopMovieSelector
        open={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        onSelectMovie={handleSelectMovie}
        rankPosition={selectedRank || 1}
      />

      <Menu
        anchorEl={rankMenuAnchor}
        open={Boolean(rankMenuAnchor)}
        onClose={() => setRankMenuAnchor(null)}
      >
        {[1, 2, 3].map(rank => (
          <MenuItem
            key={rank}
            onClick={() => handleSelectNewRank(rank)}
            disabled={movieToChangeRank?.rank === rank}
          >
            Change to Rank #{rank}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
