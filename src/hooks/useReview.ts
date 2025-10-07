import useSWR from 'swr';
import { apiFetcher } from '@/utils/apiFetcher';
import { useAuth } from '@/contexts/AuthContext';
import { MovieReview } from '@/types';

export function useMovieReviews(movieId: string | null) {
  const { token } = useAuth();
  const key = movieId && token ? [`/reviews/movie/${movieId}`, token] : null;
  const { data, error, isLoading } = useSWR<MovieReview[]>(key, apiFetcher);
  return { reviews: data, error, isLoading };
}