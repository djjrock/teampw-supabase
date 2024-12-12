import { supabase } from '../client';
import type { Profile } from '../../../types';
import { config } from '../config';

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function createProfile(userId: string, organizationId: string, isFirstUser: boolean) {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: userId,
      organization_id: organizationId,
      role: isFirstUser ? config.organization.roles.OWNER : config.organization.roles.MEMBER,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}