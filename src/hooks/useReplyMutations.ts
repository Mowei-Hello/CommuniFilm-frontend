import { useAuth } from '@/contexts/AuthContext';
import { CreateReplyPayload } from '@/types';

export function useReplyMutations(reviewId: string) {
  const { user, token } = useAuth();

  const createReply = async (text: string, movieId: number) => {
    if (!user || !token) {
      throw new Error('User is not authenticated');
    }

    const payload: CreateReplyPayload = {
      parentReviewId: reviewId,
      movieId,
      userId: user.uid,
      username: user.displayName,
      text,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/replies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to create reply');
    }

    return response.json();
  };

  return {
    createReply,
  };
}
