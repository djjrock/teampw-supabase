-- Enable RLS on all tables
alter table organizations enable row level security;
alter table profiles enable row level security;

-- Organization policies
create policy "Users can view their organization"
  on organizations for select
  using (
    id in (
      select organization_id from profiles
      where id = auth.uid()
    )
  );

create policy "Organization owners can update their organization"
  on organizations for update
  using (
    id in (
      select organization_id from profiles
      where id = auth.uid() and role = 'owner'
    )
  );

-- Profile policies
create policy "Users can view profiles in their organization"
  on profiles for select
  using (
    organization_id in (
      select organization_id from profiles
      where id = auth.uid()
    )
  );

create policy "Users can update their own profile"
  on profiles for update
  using (id = auth.uid());