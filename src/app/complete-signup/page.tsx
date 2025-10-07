'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useUserMutations } from '@/hooks';
import { useRouter } from 'next/navigation';
import { useState, FormEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import Spinner from '@/components/Spinner';
import { Button, TextField, Box, Typography, Container } from '@mui/material';

export default function CompleteSignupPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { updateUserProfile } = useUserMutations();
  const router = useRouter();
  const [bio, setBio] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      await updateUserProfile({bio}); // Call the mutation function
      toast.success('Profile saved successfully!', { id: toastId });
      router.push('/');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'An unknown error occurred.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthLoading || !user) {
    return <Spinner fullPage />;
  }

  return (
    <Container component="main" maxWidth="sm">
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
        <Typography component="p" sx={{ mt: 1 }}>
          Welcome, {user.displayName}! Tell us a bit about yourself.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
            sx={{ mt: 3, mb: 2 }}
          >
            {isSubmitting ? <Spinner size={24} /> : 'Save Profile'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}