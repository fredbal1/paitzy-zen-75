
/**
 * Error thrown when trying to perform data operations without Supabase connection
 */
export class NotConnectedError extends Error {
  constructor(message = 'Supabase is not connected yet. Please connect your project to Supabase to enable this functionality.') {
    super(message);
    this.name = 'NotConnectedError';
  }
}
