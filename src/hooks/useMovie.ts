import useSWR from 'swr';
import { apiFetcher } from '@/utils/apiFetcher';
import { useAuth } from '@/contexts/AuthContext';
import { Movie } from '@/types';

export function useTrendingMovies() {
  const { token } = useAuth();
  const key = token ? ['/movies?trending=true', token] : null;

  const { data, error, isLoading } = useSWR<Movie[]>(key, apiFetcher);
  
  return { movies: data, error, isLoading };
}