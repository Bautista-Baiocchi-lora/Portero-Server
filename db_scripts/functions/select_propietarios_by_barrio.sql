create or replace function select_propietarios_by_barrio(
    barrio_idf uuid
)
returns table(id uuid, since timestamp without time zone, email text, dev_id text, first_name text, last_name text, doc_id text, lote_id uuid) as $$
begin
    return query
    select prop.user_id, prop.creation_date, a.email, prop.device_id, p.first_name, p.last_name, p.doc_id, l.id
    from
    (person p join account a on p.id = a.id)
    inner join
    (propietario prop left join (lote l inner join lote_in_barrio lib on l.id = lib.lote_id)
        on prop.lote_id = l.id)
    on a.id = prop.user_id
    where lib.barrio_id = barrio_idf and prop.enabled = true;
end
$$ language plpgsql;
    

