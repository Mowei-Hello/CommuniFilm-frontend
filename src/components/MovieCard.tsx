import Link from 'next/link';
import { Movie } from '@/types';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.posterURL 
    ? `https://image.tmdb.org/t/p/w500${movie.posterURL}`
    : '/placeholder.png'; // A fallback image

  return (
    <Link href={`/movie/${movie.id}`} passHref style={{ textDecoration: 'none' }}>
      <Card sx={{ display: 'flex', mb: 2, height: 180, cursor: 'pointer' }}>
        <CardMedia
          component="img"
          sx={{ width: 120 }}
          image={imageUrl}
          alt={movie.title}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h6">
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}>
              {movie.overview}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Link>
  );
}