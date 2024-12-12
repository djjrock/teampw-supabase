import { supabase } from '../client';
import type { Organization } from '../../../types';

export async function getOrganizationByDomain(domain: string) {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('domain', domain)
    .single();

  if (error) throw error;
  return data;
}

export async function createOrganization(name: string, domain: string) {
  const { data, error } = await supabase
    .from('organizations')
    .insert({ name, domain })
    .select()
    .single();

  if (error) throw error;
  return data;
}