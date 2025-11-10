'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LightDarkToggle from './LightDarkToggle';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo/Brand */}
        <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              cursor: 'pointer',
              color: 'primary.main',
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            CommuniFilm
          </Typography>
        </Link>

        {/* Right side actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Dark mode toggle */}
          <LightDarkToggle />

          {user ? (
            <>
              <Typography variant="body2" sx={{ mr: 1, display: { xs: 'none', sm: 'block' } }}>
                Welcome, {user.displayName}!
              </Typography>

              <Link href="/profile" passHref style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  startIcon={<PersonIcon />}
                  size="small"
                >
                  Profile
                </Button>
              </Link>

              <Button
                variant="contained"
                startIcon={<LogoutIcon />}
                onClick={logout}
                size="small"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login" passHref style={{ textDecoration: 'none' }}>
              <Button variant="contained" size="small">
                Login
              </Button>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}