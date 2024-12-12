import { useEffect, useState } from 'react';
import { supabase } from '../client';
import type { Organization } from '../../../types/models';
import { useAuthStore } from '../../../store/authStore';

export function useOrganization() {
  const { user } = useAuthStore();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchOrganization() {
      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', user.id)
        .single();

      if (profile?.organization_id) {
        const { data: org } = await supabase
          .from('organizations')
          .select('*')
          .eq('id', profile.organization_id)
          .single();

        setOrganization(org);
      }

      setLoading(false);
    }

    fetchOrganization();
  }, [user]);

  return {
    organization,
    loading,
  };
}