// Domain models used throughout the application
export type UserRole = 'owner' | 'admin' | 'member';
export type NotificationType = 'success' | 'warning' | 'info';
export type PasswordAction = 'viewed' | 'copied' | 'edited' | 'shared';

export interface Organization {
  id: string;
  name: string;
  domain: string;
  created_at: string;
  updated_at: string;
}

export interface Team {
  id: string;
  organization_id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  organization_id?: string;
  full_name?: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: Exclude<UserRole, 'owner'>;
  created_at: string;
}

export interface Password {
  id: string;
  organization_id: string;
  team_id?: string;
  name: string;
  username: string;
  encrypted_password: string;
  url?: string;
  category?: string;
  notes?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface PasswordAccessLog {
  id: string;
  password_id: string;
  user_id: string;
  action: PasswordAction;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  organization_id: string;
  type: NotificationType;
  title: string;
  description?: string;
  read: boolean;
  created_at: string;
}