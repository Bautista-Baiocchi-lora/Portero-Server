create or replace function select_guardias_by_barrio(
    barrio_idf uuid
)
returns table(g_id uuid, g_email text, g_fn text, g_ln text, g_birth date, g_doc_id text, g_doc_type int, g_rank int, g_since timestamp without time zone) as $$
    begin 
        return query
        select a.id, a.email, p.last_name, p.first_name, p.birth_date, p.doc_id, p.doc_type, g.rank, g.creation_date
        from 
        (account a inner join person p on a.id = p.id)
        inner join 
        guardia g 
        on g.user_id = a.id
        where g.barrio_id = barrio_idf and g.enabled = true;
    end
$$ language plpgsql;