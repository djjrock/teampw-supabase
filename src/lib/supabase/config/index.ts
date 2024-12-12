import { validateEnv } from './env';

const env = validateEnv();

export const config = {
  env: {
    supabaseUrl: env.VITE_SUPABASE_URL,
    supabaseAnonKey: env.VITE_SUPABASE_ANON_KEY,
    appName: env.VITE_APP_NAME,
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

export { validateEnv };