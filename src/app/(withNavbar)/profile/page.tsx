'use client';

import { useUser } from '@/hooks/useUser';
import TopMoviesManager from '@/components/TopMoviesManager';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import Spinner from '@/components/Spinner';

export default function ProfilePage() {
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <Container component="main" maxWidth="md" sx={{ py: 4 }}>
        <Spinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container component="main" maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Profile
        </Typography>
        <Typography color="error">
          We couldn&apos;t load your profile. Please try again.
        </Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container component="main" maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Profile
        </Typography>
        <Typography>
          You&apos;re not signed in. <a href="/login">Sign in</a>
        </Typography>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        My Profile
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Name:</strong> {user.displayName ?? '—'}
          </Typography>
          <Typography variant="body1">
            <strong>Bio:</strong> {user.bio ?? '—'}
          </Typography>
        </Box>
      </Paper>

      <Divider sx={{ mb: 4 }} />

      <TopMoviesManager initialTopMovies={user.topMovies} />
    </Container>
  );
}
