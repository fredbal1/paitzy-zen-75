
import { NotConnectedError } from './NotConnectedError';

export interface Weight {
  id: string;
  pet_id: string;
  kg: number;
  measured_at: string;
  created_at: string;
}

/**
 * Get weight entries for a pet
 * Returns empty array when not connected to Supabase
 */
export async function listWeights(petId: string): Promise<Weight[]> {
  // Return empty array - no mock data
  return [];
}

/**
 * Get the most recent weight for a pet
 * Returns null when not connected to Supabase
 */
export async function getLatestWeight(petId: string): Promise<Weight | null> {
  // Return null - no mock data
  return null;
}

/**
 * Add a new weight entry
 * Throws NotConnectedError when not connected to Supabase
 */
export async function addWeight(
  petId: string, 
  kg: number, 
  measuredAt?: string
): Promise<Weight> {
  throw new NotConnectedError('Cannot add weight - Supabase connection required');
}

/**
 * Delete a weight entry
 * Throws NotConnectedError when not connected to Supabase
 */
export async function deleteWeight(id: string): Promise<void> {
  throw new NotConnectedError('Cannot delete weight - Supabase connection required');
}
