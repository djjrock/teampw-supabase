export const AUTH_REDIRECT_URL = `${window.location.origin}/auth/callback`;

export const USER_ROLES = {
  SUPERADMIN: 'superadmin',
  OWNER: 'owner',
  ADMIN: 'admin',
  MEMBER: 'member',
} as const;

export const AUTH_PROVIDERS = ['magic_link'] as const;