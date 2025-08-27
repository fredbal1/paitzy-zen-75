
import { NotConnectedError } from './NotConnectedError';

export interface Issue {
  id: string;
  pet_id: string;
  severity: 'low' | 'medium' | 'high';
  symptom: string;
  resolved: boolean;
  created_at: string;
}

/**
 * Get issues for a specific pet
 * Returns empty array when not connected to Supabase
 */
export async function listIssues(petId: string): Promise<Issue[]> {
  // Return empty array - no mock data
  return [];
}

/**
 * Get all open issues across all pets
 * Returns empty array when not connected to Supabase
 */
export async function listOpenIssues(): Promise<Issue[]> {
  // Return empty array - no mock data
  return [];
}

/**
 * Report a new issue
 * Throws NotConnectedError when not connected to Supabase
 */
export async function reportIssue(
  petId: string,
  severity: Issue['severity'],
  symptom: string
): Promise<Issue> {
  throw new NotConnectedError('Cannot report issue - Supabase connection required');
}

/**
 * Mark an issue as resolved
 * Throws NotConnectedError when not connected to Supabase
 */
export async function resolveIssue(id: string): Promise<Issue> {
  throw new NotConnectedError('Cannot resolve issue - Supabase connection required');
}
