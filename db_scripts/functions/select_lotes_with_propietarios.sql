create or replace function select_lotes_with_propietarios(
    barrio_idf uuid
)
returns table (prop_id uuid, email text, prop_fn text, prop_ln text, birth date, doc_id text, doc_type int, prop_since timestamp without time zone, lote_id uuid, lote_street text, lote_num int, lote_code int, lote_name text) as $$
    begin 
        return query
        select
        a.id, a.email, p.first_name, p.last_name, p.birth_date, p.doc_id, p.doc_type, prop.creation_date, l.id, l.street, l.num, l.code, lib.name 
        from 
        (account a inner join person p on a.id = p.id)
        right join 
        (propietario prop right join (lote l inner join lote_in_barrio lib on l.id = lib.lote_id)
        on prop.lote_id = l.id)
        on a.id = prop.user_id
        where lib.barrio_id = barrio_idf;
    end
$$ language plpgsql;