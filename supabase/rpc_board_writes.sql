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
