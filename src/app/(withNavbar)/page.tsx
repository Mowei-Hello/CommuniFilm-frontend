'use client';

import SearchBar from '@/components/SearchBar';
import { Container, Typography } from '@mui/material';

export default function HomePage() {

  return (
    <Container component="main" maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Find Your Next Movie
      </Typography>
      <SearchBar />
    </Container>
  );
}