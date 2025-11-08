import Link from 'next/link';
import { FavoriteMovie } from '@/types';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TopMovieCardProps {
  movie: FavoriteMovie;
  onEdit?: () => void;
  onRemove?: () => void;
  isEditable?: boolean;
}

const rankColors: { [key: number]: string } = {
  1: '#FFD700', // Gold
  2: '#C0C0C0', // Silver
  3: '#CD7F32', // Bronze
};

export default function TopMovieCard({
  movie,
  onEdit,
  onRemove,
  isEditable = false
}: TopMovieCardProps) {
  const imageUrl = movie.posterURL
    ? `https://image.tmdb.org/t/p/w500${movie.posterURL}`
    : '/placeholder.png';

  const cardContent = (
    <Card
      sx={{
        display: 'flex',
        mb: 3,
        height: 200,
        position: 'relative',
        border: `3px solid ${rankColors[movie.rank]}`,
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 1,
        }}
      >
        <Chip
          label={`#${movie.rank}`}
          sx={{
            bgcolor: rankColors[movie.rank],
            color: 'black',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            height: 36,
            minWidth: 50,
          }}
        />
      </Box>

      <CardMedia
        component="img"
        sx={{ width: 140 }}
        image={imageUrl}
        alt={movie.title}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flex: '1 0 auto', pt: 2 }}>
          <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }}>
            {movie.title}
          </Typography>

          {movie.releaseDate && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {new Date(movie.releaseDate).getFullYear()}
            </Typography>
          )}

          {movie.voteAverage !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Rating value={movie.voteAverage / 2} precision={0.1} readOnly size="small" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {movie.voteAverage.toFixed(1)}/10
              </Typography>
            </Box>
          )}

          {movie.overview && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {movie.overview}
            </Typography>
          )}
        </CardContent>

        {isEditable && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            {onEdit && (
              <IconButton size="small" onClick={onEdit} color="primary">
                <EditIcon />
              </IconButton>
            )}
            {onRemove && (
              <IconButton size="small" onClick={onRemove} color="error">
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        )}
      </Box>
    </Card>
  );

  if (isEditable) {
    return cardContent;
  }

  return (
    <Link href={`/movie/${movie.movieId}`} passHref style={{ textDecoration: 'none' }}>
      {cardContent}
    </Link>
  );
}
