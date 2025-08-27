
import { NotConnectedError } from './NotConnectedError';

export interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'other';
  breed?: string;
  sex?: 'male' | 'female';
  birthdate?: string;
  avatar_url?: string;
  created_at: string;
}

/**
 * Get all pets for the current user
 * Returns empty array when not connected to Supabase
 */
export async function listPets(): Promise<Pet[]> {
  // Return empty array - no mock data
  return [];
}

/**
 * Get a specific pet by ID
 * Returns null when not connected to Supabase
 */
export async function getPetById(id: string): Promise<Pet | null> {
  // Return null - no mock data
  return null;
}

/**
 * Create a new pet
 * Throws NotConnectedError when not connected to Supabase
 */
export async function createPet(pet: Omit<Pet, 'id' | 'created_at'>): Promise<Pet> {
  throw new NotConnectedError('Cannot create pet - Supabase connection required');
}

/**
 * Update an existing pet
 * Throws NotConnectedError when not connected to Supabase
 */
export async function updatePet(id: string, updates: Partial<Pet>): Promise<Pet> {
  throw new NotConnectedError('Cannot update pet - Supabase connection required');
}

/**
 * Delete a pet
 * Throws NotConnectedError when not connected to Supabase
 */
export async function deletePet(id: string): Promise<void> {
  throw new NotConnectedError('Cannot delete pet - Supabase connection required');
}
