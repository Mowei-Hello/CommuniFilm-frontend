import useSWR from 'swr';
import { apiFetcher } from '@/utils/apiFetcher';
import { useAuth } from '@/contexts/AuthContext';
import { ReviewReply } from '@/types';

export function useReplies(reviewId: string | null) {
  const { token } = useAuth();
  const key = reviewId && token ? [`/replies/review/${reviewId}`, token] : null;
  const { data, error, isLoading, mutate } = useSWR<ReviewReply[]>(key, apiFetcher);

  return {
    replies: data,
    error,
    isLoading,
    mutate
  };
}
