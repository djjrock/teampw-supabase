import { useEffect, useState } from 'react';
import { supabase } from '../client';
import type { Team } from '../../../types/models';
import { useOrganization } from './useOrganization';

export function useTeams() {
  const { organization } = useOrganization();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!organization) return;

    async function fetchTeams() {
      const { data } = await supabase
        .from('teams')
        .select('*')
        .eq('organization_id', organization.id);

      setTeams(data || []);
      setLoading(false);
    }

    fetchTeams();
  }, [organization]);

  const createTeam = async (name: string, description?: string) => {
    if (!organization) throw new Error('No organization found');

    const { data, error } = await supabase
      .from('teams')
      .insert({
        organization_id: organization.id,
        name,
        description,
      })
      .select()
      .single();

    if (error) throw error;
    setTeams([...teams, data]);
    return data;
  };

  return {
    teams,
    loading,
    createTeam,
  };
}