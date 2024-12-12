// Generated types from Supabase schema
export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          domain: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Organizations['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Organizations['Row']>;
      };
      teams: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Teams['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Teams['Row']>;
      };
      profiles: {
        Row: {
          id: string;
          organization_id: string | null;
          full_name: string | null;
          avatar_url: string | null;
          role: 'owner' | 'admin' | 'member';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Profiles['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Profiles['Row']>;
      };
      team_members: {
        Row: {
          id: string;
          team_id: string;
          user_id: string;
          role: 'admin' | 'member';
          created_at: string;
        };
        Insert: Omit<TeamMembers['Row'], 'id' | 'created_at'>;
        Update: Partial<TeamMembers['Row']>;
      };
      passwords: {
        Row: {
          id: string;
          organization_id: string;
          team_id: string | null;
          name: string;
          username: string;
          encrypted_password: string;
          url: string | null;
          category: string | null;
          notes: string | null;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Passwords['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Passwords['Row']>;
      };
      password_access_logs: {
        Row: {
          id: string;
          password_id: string;
          user_id: string;
          action: 'viewed' | 'copied' | 'edited' | 'shared';
          created_at: string;
        };
        Insert: Omit<PasswordAccessLogs['Row'], 'id' | 'created_at'>;
        Update: Partial<PasswordAccessLogs['Row']>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          organization_id: string;
          type: 'success' | 'warning' | 'info';
          title: string;
          description: string | null;
          read: boolean;
          created_at: string;
        };
        Insert: Omit<Notifications['Row'], 'id' | 'created_at'>;
        Update: Partial<Notifications['Row']>;
      };
    };
  };
};