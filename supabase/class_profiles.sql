create table if not exists public.class_profiles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  profile jsonb not null,
  identikey text
);

alter table public.class_profiles add column if not exists identikey text;

update public.class_profiles
set identikey = lower(trim(identikey))
where identikey is not null;

update public.class_profiles
set identikey = 'legacy-' || replace(id::text, '-', '')
where identikey is null or identikey = '';

with ranked as (
  select id,
         row_number() over (partition by identikey order by created_at desc) as rn
  from public.class_profiles
)
delete from public.class_profiles
where id in (select id from ranked where rn > 1);

alter table public.class_profiles alter column identikey set not null;

create unique index if not exists class_profiles_identikey_uq on public.class_profiles (identikey);

create index if not exists class_profiles_created_at_idx on public.class_profiles (created_at desc);

alter table public.class_profiles enable row level security;

create or replace view public.class_profiles_board
  with (security_invoker = false)
  as
  select id, created_at, profile
  from public.class_profiles;

revoke select on public.class_profiles from anon;
revoke select on public.class_profiles from authenticated;
grant select on public.class_profiles_board to anon;
grant select on public.class_profiles_board to authenticated;

revoke insert on public.class_profiles from anon;
revoke insert on public.class_profiles from authenticated;

drop policy if exists "class_profiles_select_public" on public.class_profiles;
drop policy if exists "class_profiles_insert_public" on public.class_profiles;

drop function if exists public.upsert_class_profile(text, jsonb);
drop function if exists public.delete_class_profile_by_identikey(text);

create function public.upsert_class_profile(p_identikey text, p_profile jsonb)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  k text := lower(trim(p_identikey));
  v_id uuid;
begin
  if k = '' or length(k) > 64 then
    raise exception 'invalid identikey';
  end if;
  insert into public.class_profiles (identikey, profile)
  values (k, p_profile)
  on conflict (identikey) do update
    set profile = excluded.profile,
        created_at = now()
  returning id into v_id;
  return v_id;
end;
$$;

create function public.delete_class_profile_by_identikey(p_identikey text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  k text := lower(trim(p_identikey));
  n bigint;
begin
  if k = '' or length(k) > 64 then
    raise exception 'invalid identikey';
  end if;
  delete from public.class_profiles c where c.identikey = k;
  get diagnostics n = row_count;
  return n;
end;
$$;

grant execute on function public.upsert_class_profile(text, jsonb) to anon, authenticated;
grant execute on function public.delete_class_profile_by_identikey(text) to anon, authenticated;

select pg_notify('pgrst', 'reload schema');
