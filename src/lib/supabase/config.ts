import { z } from 'zod';

// Environment validation schema
const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1),
  VITE_APP_NAME: z.string().min(1),
});

// Validate environment variables
export function validateEnv() {
  const parsed = envSchema.safeParse({
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
  });

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
  }
}

// Application configuration
export const config = {
  env: {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    appName: import.meta.env.VITE_APP_NAME,
  },
  auth: {
    redirectUrl: `${window.location.origin}/auth/callback`,
    providers: ['magic_link'] as const,
  },
  organization: {
    roles: {
      SUPERADMIN: 'superadmin',
      OWNER: 'owner',
      ADMIN: 'admin',
      MEMBER: 'member',
    },
  },
} as const;