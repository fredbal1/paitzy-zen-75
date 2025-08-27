
import { NotConnectedError } from './NotConnectedError';

export interface WellbeingLog {
  id: string;
  pet_id: string;
  score: number; // 0-100
  note?: string;
  logged_at: string;
  created_at: string;
}

export interface WellbeingStats {
  current_score?: number;
  trend?: 'up' | 'down' | 'stable';
  trend_percentage?: number;
  last_update?: string;
  open_issues_count: number;
}

/**
 * Get wellbeing statistics for a pet
 * Returns stats with no data when not connected to Supabase
 */
export async function getWellbeingStats(petId: string): Promise<WellbeingStats> {
  // Return empty stats - no mock data
  return {
    open_issues_count: 0
  };
}

/**
 * Get wellbeing logs for a pet
 * Returns empty array when not connected to Supabase
 */
export async function listWellbeingLogs(petId: string): Promise<WellbeingLog[]> {
  // Return empty array - no mock data
  return [];
}

/**
 * Log a wellbeing entry
 * Throws NotConnectedError when not connected to Supabase
 */
export async function logWellbeing(
  petId: string, 
  score: number, 
  note?: string
): Promise<WellbeingLog> {
  throw new NotConnectedError('Cannot log wellbeing - Supabase connection required');
}

/**
 * Get overall wellbeing statistics for all pets
 * Returns stats with no data when not connected to Supabase
 */
export async function getOverallWellbeingStats(): Promise<WellbeingStats> {
  // Return empty stats - no mock data
  return {
    open_issues_count: 0
  };
}
