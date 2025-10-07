import useSWR from 'swr';
import { apiFetcher } from '@/utils/apiFetcher';
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/types';

/**
 * Hook fetching multiple users by their UIDs
 * @param uids Array of user UIDs
 * @returns An object containing the users data, loading state, and any error
 */
export function useUsers(uids: string[]) {
  const { token } = useAuth();
  
  const uniqueUids = [...new Set(uids)]; // Ensure unique UIDs
  const params = new URLSearchParams();
  uniqueUids.forEach(uid => params.append('uids', uid));

  // Only fetch if there are UIDs and a token
  const key = uids.length > 0 && token ? [`/users?${params.toString()}`, token] : null;

  const { data, error, isLoading } = useSWR<User[]>(key, apiFetcher);

  return { users: data, error, isLoading };
}