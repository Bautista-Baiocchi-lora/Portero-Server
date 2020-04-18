create or replace function select_lotes_with_propietarios(
    barrio_idf uuid
)
returns table (prop_id uuid, email text, prop_fn text, prop_ln text, doc_id text, doc_type int, lote_id uuid, prop_since timestamp without time zone, lote_name text, lote_street text, lote_num int, lote_code int) as $$
    begin 
	   return query
       select a.id, a.email, p.first_name, p.last_name, p.doc_id, p.doc_type,
       pol.lote_id, pol.creation_date, l.name, l.street, l.num, l.code
       from 
       (propietario_of_lote pol right join lote l on pol.lote_id = l.id)
       left join 
       (account a inner join propietario p on a.id = p.id) 
       on a.id = pol.propietario_id
       where l.barrio_id = barrio_idf;
    end
$$ language plpgsql;
