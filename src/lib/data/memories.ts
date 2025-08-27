
import { NotConnectedError } from './NotConnectedError';

export interface Memory {
  id: string;
  pet_id: string;
  image_url: string;
  caption?: string;
  taken_at: string;
  created_at: string;
}

/**
 * Get memories for a specific pet
 * Returns empty array when not connected to Supabase
 */
export async function listMemoriesByPet(petId: string): Promise<Memory[]> {
  // Return empty array - no mock data
  return [];
}

/**
 * Get all memories for the current user
 * Returns empty array when not connected to Supabase
 */
export async function listMemories(): Promise<Memory[]> {
  // Return empty array - no mock data
  return [];
}

/**
 * Upload a new memory
 * Throws NotConnectedError when not connected to Supabase
 */
export async function uploadMemory(
  petId: string, 
  file: File, 
  caption?: string
): Promise<Memory> {
  throw new NotConnectedError('Cannot upload memory - Supabase connection and Storage required');
}

/**
 * Delete a memory
 * Throws NotConnectedError when not connected to Supabase
 */
export async function deleteMemory(id: string): Promise<void> {
  throw new NotConnectedError('Cannot delete memory - Supabase connection required');
}
