
import { useQuery } from '@tanstack/react-query';
import { listPets } from '../data/pets';

/**
 * Hook to fetch all pets for the current user
 */
export function usePets() {
  return useQuery({
    queryKey: ['pets'],
    queryFn: listPets,
    retry: false, // Don't retry when not connected to Supabase
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
