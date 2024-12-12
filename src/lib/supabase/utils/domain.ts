export function extractDomain(email: string): string {
  return email.split('@')[1].toLowerCase();
}

export function formatOrganizationName(domain: string): string {
  return domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
}