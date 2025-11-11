'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import { Orbitron } from 'next/font/google';
import { Box, Container, Typography, Paper, CircularProgress, useTheme } from '@mui/material';
import LightDarkToggle from '@/components/LightDarkToggle';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '500', '700'], display: 'swap' });

export default function LoginPage() {
  const { handleLoginSuccess } = useAuth();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoginError = () => {
    setLoading(false);
    setError('Google login failed. Please try again.');
    toast.error('Google login failed. Please try again.');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        textAlign: 'center',
        fontFamily: orbitron.style.fontFamily,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
        }}
      >
        <LightDarkToggle />
      </Box>

      <Image
        src="/CommuniFilm_Logo.svg"
        alt="CommuniFilm Logo"
        width={420}
        height={375}
        unoptimized
        priority
        style={{ marginBottom: '1rem', objectFit: 'contain' }}
      />

      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            background: 'rgba(10, 10, 10, 0.35)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            border: '1px solid rgba(255, 0, 150, 0.3)',
            boxShadow: '0 0 25px 4px rgba(255, 0, 150, 0.4)',
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{
              color: 'primary.main',
            }}
          >
            Welcome to CommuniFilm
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 3,
              color: 'text.secondary',
            }}
          >
            Please sign in with Google
          </Typography>

          <Box
            sx={{
              opacity: loading ? 0.5 : 1,
              pointerEvents: loading ? 'none' : 'auto',
              transition: 'opacity 0.3s ease',
              display: 'inline-block',
              '&:hover': {
                backgroundColor: 'action.hover',
                borderRadius: 1,
              },
              p: '2px',
            }}
          >
            <GoogleLogin
              onSuccess={(res) => {
                setLoading(true);
                handleLoginSuccess(res);
                setLoading(false);
              }}
              onError={handleLoginError}
            />
          </Box>

          {loading && (
            <Box sx={{ mt: 2 }}>
              <CircularProgress size={24} sx={{ color: 'primary.main' }} />
            </Box>
          )}

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2, fontWeight: 500 }}>
              {error}
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
