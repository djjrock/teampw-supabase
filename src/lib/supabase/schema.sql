-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create tables
create table organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  domain text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table profiles (
  id uuid primary key references auth.users on delete cascade,
  organization_id uuid references organizations on delete set null,
  full_name text,
  avatar_url text,
  role text check (role in ('superadmin', 'owner', 'admin', 'member')) not null default 'member',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create function to extract domain from email
create or replace function get_email_domain(email text)
returns text as $$
begin
  return lower(split_part(email, '@', 2));
end;
$$ language plpgsql;