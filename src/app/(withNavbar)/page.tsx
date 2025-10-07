'use client';
import Spinner from '@/components/Spinner';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner fullPage/>;
  }

  if (!user) {
    return null; // Prevent rendering anything before redirect
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Welcome, {user.displayName}!</h1>
      <p>This is the home page. Trendy movie thumbnails will go here.</p>
      {/* TODO: Add MovieList components */}
    </main>
  );
}