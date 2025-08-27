
import { NotConnectedError } from './NotConnectedError';

export interface Event {
  id: string;
  pet_id: string;
  type: 'appointment' | 'care' | 'watch';
  title: string;
  at: string;
  done: boolean;
  created_at: string;
}

export type EventRange = 'today' | 'upcoming' | 'completed';

/**
 * Get events filtered by range
 * Returns empty array when not connected to Supabase
 */
export async function listEvents(range: EventRange = 'upcoming'): Promise<Event[]> {
  // Return empty array - no mock data
  return [];
}

/**
 * Get events for a specific pet
 * Returns empty array when not connected to Supabase
 */
export async function listEventsByPet(petId: string): Promise<Event[]> {
  // Return empty array - no mock data
  return [];
}

/**
 * Create a new event
 * Throws NotConnectedError when not connected to Supabase
 */
export async function createEvent(event: Omit<Event, 'id' | 'created_at'>): Promise<Event> {
  throw new NotConnectedError('Cannot create event - Supabase connection required');
}

/**
 * Toggle event completion status
 * Throws NotConnectedError when not connected to Supabase
 */
export async function toggleEventDone(id: string): Promise<Event> {
  throw new NotConnectedError('Cannot update event - Supabase connection required');
}

/**
 * Update an existing event
 * Throws NotConnectedError when not connected to Supabase
 */
export async function updateEvent(id: string, updates: Partial<Event>): Promise<Event> {
  throw new NotConnectedError('Cannot update event - Supabase connection required');
}

/**
 * Delete an event
 * Throws NotConnectedError when not connected to Supabase
 */
export async function deleteEvent(id: string): Promise<void> {
  throw new NotConnectedError('Cannot delete event - Supabase connection required');
}
