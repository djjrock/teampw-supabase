import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../types/database';
import { config } from './config';

export const supabase = createClient<Database>(
  config.env.supabaseUrl,
  config.env.supabaseAnonKey
);