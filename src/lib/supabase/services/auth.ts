import { supabase } from '../client';
import { config } from '../config';
import { extractDomain, formatOrganizationName } from '../utils';
import { createOrganization, getOrganizationByDomain } from './organizations';
import { createProfile } from './profiles';

export async function signInWithMagicLink(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: config.auth.redirectUrl,
    },
  });

  if (error) throw error;
}

export async function handleAuthCallback(user: { id: string; email: string }) {
  if (!user.email) throw new Error('User email is required');

  const domain = extractDomain(user.email);
  let organization = await getOrganizationByDomain(domain);

  // Create organization if it doesn't exist
  if (!organization) {
    organization = await createOrganization(
      formatOrganizationName(domain),
      domain
    );
    // First user is the owner
    await createProfile(user.id, organization.id, true);
  } else {
    // Add user to existing organization as member
    await createProfile(user.id, organization.id, false);
  }

  return organization;
}