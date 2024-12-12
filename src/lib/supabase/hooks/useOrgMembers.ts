import { useEffect, useState } from 'react';
import { supabase } from '../client';
import type { Profile } from '../../../types/models';
import { useOrganization } from './useOrganization';

export function useOrgMembers() {
  const { organization } = useOrganization();
  const [members, setMembers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!organization) return;

    async function fetchMembers() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('organization_id', organization.id)
        .order('role', { ascending: false }); // owners & admins first

      if (error) throw error;
      setMembers(data || []);
      setLoading(false);
    }

    fetchMembers();
  }, [organization]);

  const updateMemberRole = async (userId: string, role: Profile['role']) => {
    if (!organization) throw new Error('No organization found');

    const { data, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId)
      .eq('organization_id', organization.id)
      .select()
      .single();

    if (error) throw error;
    setMembers(members.map(m => m.id === userId ? data : m));
    return data;
  };

  return {
    members,
    loading,
    updateMemberRole,
  };
}