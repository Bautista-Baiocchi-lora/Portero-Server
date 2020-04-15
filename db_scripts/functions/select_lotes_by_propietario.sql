create or replace function select_lotes_by_propietario(
    propietario_idf uuid,
    device_idf text
)
returns table (lote_id uuid, lote_name text, lote_street text, lote_num int, lote_code int, barrio_id uuid, nickname text) as $$
    begin 
	   return query
       select lote.id, lote.name, lote.street, lote.num, lote.code, lote.barrio_id, propietario_of_lote.nickname
       from lote, propietario_of_lote 
       where lote.id = propietario_of_lote.lote_id and propietario_of_lote.propietario_id = propietario_idf and propietario_of_lote.device_id = device_idf;
    end
$$ language plpgsql;
