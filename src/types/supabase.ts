
/**
 * TypeScript interfaces mirroring Supabase table structures
 * These will be used once Supabase is connected
 */

export interface Database {
  public: {
    Tables: {
      owners: {
        Row: Owner;
        Insert: Omit<Owner, 'id' | 'created_at'>;
        Update: Partial<Omit<Owner, 'id'>>;
      };
      pets: {
        Row: Pet;
        Insert: Omit<Pet, 'id' | 'created_at'>;
        Update: Partial<Omit<Pet, 'id'>>;
      };
      events: {
        Row: Event;
        Insert: Omit<Event, 'id' | 'created_at'>;
        Update: Partial<Omit<Event, 'id'>>;
      };
      weights: {
        Row: Weight;
        Insert: Omit<Weight, 'id' | 'created_at'>;
        Update: Partial<Omit<Weight, 'id'>>;
      };
      wellbeing_logs: {
        Row: WellbeingLog;
        Insert: Omit<WellbeingLog, 'id' | 'created_at'>;
        Update: Partial<Omit<WellbeingLog, 'id'>>;
      };
      issues: {
        Row: Issue;
        Insert: Omit<Issue, 'id' | 'created_at'>;
        Update: Partial<Omit<Issue, 'id'>>;
      };
      memories: {
        Row: Memory;
        Insert: Omit<Memory, 'id' | 'created_at'>;
        Update: Partial<Omit<Memory, 'id'>>;
      };
    };
  };
}

export interface Owner {
  id: string;
  email: string;
  created_at: string;
}

export interface Pet {
  id: string;
  owner_id: string;
  name: string;
  species: 'dog' | 'cat' | 'other';
  breed?: string;
  sex?: 'male' | 'female';
  birthdate?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Event {
  id: string;
  pet_id: string;
  type: 'appointment' | 'care' | 'watch';
  title: string;
  at: string;
  done: boolean;
  created_at: string;
}

export interface Weight {
  id: string;
  pet_id: string;
  kg: number;
  measured_at: string;
  created_at: string;
}

export interface WellbeingLog {
  id: string;
  pet_id: string;
  score: number; // 0-100
  note?: string;
  logged_at: string;
  created_at: string;
}

export interface Issue {
  id: string;
  pet_id: string;
  severity: 'low' | 'medium' | 'high';
  symptom: string;
  resolved: boolean;
  created_at: string;
}

export interface Memory {
  id: string;
  pet_id: string;
  image_url: string;
  caption?: string;
  taken_at: string;
  created_at: string;
}
