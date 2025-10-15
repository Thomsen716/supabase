-- supabase/migrations/<timestamp>_create_users_table_and_trigger.sql

-- 1. Opret users-tabellen
create table if not exists users (
  id uuid primary key references auth.users(id),
  firstname text,
  lastname text
);

-- 2. Opret triggerfunktion til at indsætte ny bruger
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

-- 3. Opret trigger, som kalder funktionen efter brugeroprettelse
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();
