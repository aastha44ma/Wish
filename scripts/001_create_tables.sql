-- Create profiles table for both buyers and artisans
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  user_type text not null check (user_type in ('buyer', 'artisan')),
  full_name text not null,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create artisan_profiles table for additional artisan information
create table if not exists public.artisan_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  location text not null,
  specialization text not null,
  learning_source text not null,
  experience_years integer not null,
  bio text,
  profile_image_url text,
  banner_image_url text,
  rating decimal(2,1) default 0.0,
  review_count integer default 0,
  completed_projects integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create projects table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  artisan_id uuid references public.artisan_profiles(id) on delete cascade,
  title text not null,
  description text,
  image_url text,
  price text,
  completion_time text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.artisan_profiles enable row level security;
alter table public.projects enable row level security;

-- RLS Policies for profiles
create policy "Users can view all profiles" on public.profiles for select using (true);
create policy "Users can insert their own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can delete their own profile" on public.profiles for delete using (auth.uid() = id);

-- RLS Policies for artisan_profiles
create policy "Users can view all artisan profiles" on public.artisan_profiles for select using (true);
create policy "Artisans can insert their own profile" on public.artisan_profiles for insert with check (auth.uid() = id);
create policy "Artisans can update their own profile" on public.artisan_profiles for update using (auth.uid() = id);
create policy "Artisans can delete their own profile" on public.artisan_profiles for delete using (auth.uid() = id);

-- RLS Policies for projects
create policy "Users can view all projects" on public.projects for select using (true);
create policy "Artisans can insert their own projects" on public.projects for insert with check (
  exists (select 1 from public.artisan_profiles where id = auth.uid() and id = artisan_id)
);
create policy "Artisans can update their own projects" on public.projects for update using (
  exists (select 1 from public.artisan_profiles where id = auth.uid() and id = artisan_id)
);
create policy "Artisans can delete their own projects" on public.projects for delete using (
  exists (select 1 from public.artisan_profiles where id = auth.uid() and id = artisan_id)
);
