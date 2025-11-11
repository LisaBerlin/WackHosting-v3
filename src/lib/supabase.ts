import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
  id: string;
  email: string;
  full_name: string;
  api_key: string | null;
  interface_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserService {
  id: string;
  user_id: string;
  service_id: string;
  service_type: string;
  service_name: string;
  status: string;
  created_at: string;
  updated_at: string;
}
