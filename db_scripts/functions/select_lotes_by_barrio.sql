create or replace function select_lotes_by_barrio(
    barrio_idf uuid
)
returns table (lote_id uuid, lote_name text, lote_street text, lote_num int, lote_code int) as $$
    begin 
	   return query
       select l.id, l.name, l.street, l.num, l.code
       from lote l where l.barrio_id = barrio_idf;
    end
$$ language plpgsql;
