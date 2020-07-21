create or replace function select_guardias_by_barrio(
    barrio_idf uuid
)
returns table(id uuid, dev_id text, email text, fn text, g_ln text, birth date, doc_id text, rank int, since timestamp without time zone) as $$
    begin 
        return query
        select a.id, g.device_id, a.email, p.last_name, p.first_name, p.birth_date, p.doc_id, g.rank, g.creation_date
        from 
        (account a inner join person p on a.id = p.id)
        inner join 
        guardia g 
        on g.user_id = a.id
        where g.barrio_id = barrio_idf and g.enabled = true;
    end
$$ language plpgsql;