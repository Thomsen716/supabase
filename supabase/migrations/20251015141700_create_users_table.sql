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
