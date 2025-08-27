
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWellbeingStats, logWellbeing, getOverallWellbeingStats } from '../data/wellbeing';

/**
 * Hook to fetch wellbeing statistics for a specific pet
 */
export function usePetWellbeing(petId: string) {
  return useQuery({
    queryKey: ['wellbeing', petId],
    queryFn: () => getWellbeingStats(petId),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!petId,
  });
}

/**
 * Hook to fetch overall wellbeing statistics
 */
export function useOverallWellbeing() {
  return useQuery({
    queryKey: ['wellbeing', 'overall'],
    queryFn: getOverallWellbeingStats,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to log wellbeing data
 */
export function useLogWellbeing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ petId, score, note }: { petId: string; score: number; note?: string }) =>
      logWellbeing(petId, score, note),
    onSuccess: (_, variables) => {
      // Invalidate wellbeing queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['wellbeing', variables.petId] });
      queryClient.invalidateQueries({ queryKey: ['wellbeing', 'overall'] });
    },
  });
}
