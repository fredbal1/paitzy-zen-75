
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listEvents, createEvent, toggleEventDone, type EventRange } from '../data/events';

/**
 * Hook to fetch events by range
 */
export function useEvents(range: EventRange = 'upcoming') {
  return useQuery({
    queryKey: ['events', range],
    queryFn: () => listEvents(range),
    retry: false,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to create a new event
 */
export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      // Invalidate all event queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

/**
 * Hook to toggle event completion
 */
export function useToggleEventDone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleEventDone,
    onSuccess: () => {
      // Invalidate all event queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}
