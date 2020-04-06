create or replace function select_lotes(
    barrio_idf uuid
)
returns table (lote_id uuid, lote_name text, lote_street text, lote_num int, lote_code int) as $$
    begin 
	   return query
       select lote.id, lote.name, lote.street, lote.num, lote.code
       from lote where lote.barrio_id = barrio_idf;
    end
$$ language plpgsql;
