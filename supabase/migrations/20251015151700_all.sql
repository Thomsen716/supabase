-- supabase/migrations/<timestamp>_create_users_table_and_trigger.sql

-- 0. Rens op, hvis tabellen eller triggeren allerede findes
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user;
drop table if exists public.users;

-- 1. Opret users-tabellen
create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text
);

-- 2. Opret triggerfunktion til at indsætte ny bruger
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, first_name, last_name)
  values (
    new.id, 
    new.raw_user_meta_data->>'first_name', -- Hent fra metadata
    new.raw_user_meta_data->>'last_name'   -- Hent fra metadata
  );
  return new;
end;
$$ language plpgsql security definer;

-- 3. Opret trigger, som kalder funktionen efter brugeroprettelse
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- 4. Opret notes-tabellen
create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  title text not null,
  content text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Trigger til at opdatere updated_at, når en note ændres
create function update_note_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger notes_updated_at
before update on notes
for each row
execute function update_note_updated_at();

-- Slå RLS til
alter table public.users enable row level security;
alter table public.notes enable row level security;

-- Tillad at en bruger læser sin egen profil
create policy "users_select_own" on public.users
for select
using (auth.uid() = id);

-- Tillad at en bruger opdaterer sin egen profil
create policy "users_update_own" on public.users
for update
using (auth.uid() = id);

-- Tillad at en bruger kan indsætte sin egen profil
create policy "users_insert_own" on public.users
for insert
with check (auth.uid() = id);


-- Tillad at en bruger læser sine egne noter
create policy "notes_select_own" on public.notes
for select
using (auth.uid() = user_id);

-- Tillad at en bruger indsætter noter med eget user_id
create policy "notes_insert_own" on public.notes
for insert
with check (auth.uid() = user_id);

-- Tillad at en bruger opdaterer sine egne noter
create policy "notes_update_own" on public.notes
for update
using (auth.uid() = user_id);

-- Tillad at en bruger sletter sine egne noter
create policy "notes_delete_own" on public.notes
for delete
using (auth.uid() = user_id);
