import useSWR from 'swr';
import { apiFetcher } from '@/utils/apiFetcher';
import { useAuth } from '@/contexts/AuthContext';
import { Movie, MovieDetail } from '@/types';

export function useTrendingMovies() {
  const { token } = useAuth();
  const key = token ? ['/movies?trending=true', token] : null;
  const { data, error, isLoading } = useSWR<Movie[]>(key, apiFetcher);
  return { movies: data, error, isLoading };
}

export function useMovieSearch(query: string) {
  const { token } = useAuth();
  const key = query && token ? [`/movies?search=${encodeURIComponent(query)}`, token] : null;
  const { data, error, isLoading } = useSWR<Movie[]>(key, apiFetcher);
  return { movies: data, error, isLoading };
}

export function useMovieDetail(movieId: string) {
  const { token } = useAuth();
  const key = movieId && token ? [`/movies/${movieId}`, token] : null;
  const { data, error, isLoading } = useSWR<MovieDetail>(key, apiFetcher);
  return { movie: data, error, isLoading };
}