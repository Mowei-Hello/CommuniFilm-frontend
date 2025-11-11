'use client';

import { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { useUserMutations } from '@/hooks';
import TopMoviesManager from '@/components/TopMoviesManager';
import { Container, Typography, Box, Paper, Divider, TextField, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Spinner from '@/components/Spinner';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, isLoading, error, mutate } = useUser();
  const { updateUserProfile } = useUserMutations();
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioValue, setBioValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleEditBio = () => {
    setBioValue(user?.bio || '');
    setIsEditingBio(true);
  };

  const handleCancelEdit = () => {
    setIsEditingBio(false);
    setBioValue('');
  };

  const handleSaveBio = async () => {
    setIsSaving(true);
    const toastId = toast.loading('Saving bio...');

    try {
      await updateUserProfile({ bio: bioValue });
      toast.success('Bio updated!', { id: toastId });
      mutate(); // Refresh user data
      setIsEditingBio(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update bio', { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

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
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Name:</strong> {user.displayName ?? '—'}
          </Typography>

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Bio:
              </Typography>
              {!isEditingBio && (
                <IconButton
                  size="small"
                  onClick={handleEditBio}
                  sx={{ ml: 1 }}
                  aria-label="edit bio"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
            </Box>

            {isEditingBio ? (
              <Box>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={bioValue}
                  onChange={(e) => setBioValue(e.target.value)}
                  disabled={isSaving}
                  variant="outlined"
                  placeholder="Tell us about yourself..."
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveBio}
                    disabled={isSaving}
                  >
                    Save
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={handleCancelEdit}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {user.bio || 'No bio added yet.'}
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>

      <Divider sx={{ mb: 4 }} />

      <TopMoviesManager initialTopMovies={user.topMovies} />
    </Container>
  );
}
