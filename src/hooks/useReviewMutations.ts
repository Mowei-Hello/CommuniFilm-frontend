import { useAuth } from '@/contexts/AuthContext';
import { CreateReviewPayload } from '@/types';
import { useSWRConfig } from 'swr';

export function useReviewMutations(movieId: string | null) {
  const { user, token } = useAuth();
  const { mutate } = useSWRConfig();

  const createReview = async (text: string) => {
    if (!user || !token || !movieId) {
      throw new Error('Cannot create review: missing user, token, or movie ID.');
    }

    const payload: CreateReviewPayload = {
      movieId: parseInt(movieId, 10),
      userId: user.uid,
      text,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to post review.');
    }

    // After a successful post, automatically re-fetch the reviews list to show the new review without a page refresh.
    mutate([`/reviews/movie/${movieId}`, token]);
  };

  return {
    createReview,
  };
}