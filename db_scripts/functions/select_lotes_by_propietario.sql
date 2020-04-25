create or replace function select_lotes_by_propietario(
    propietario_idf uuid,
    device_idf text
)
returns table (lote_id uuid, lote_name text, lote_street text, lote_num int, lote_code int, barrio_id uuid, nickname text, barrio_name text) as $$
    begin 
	   return query
       select l.id, l.name, l.street, l.num, l.code, l.barrio_id, pl.nickname, b.name
       from 
       (barrio b inner join lote l on l.barrio_id = b.id) 
       inner join 
       propietario_of_lote pl 
       on l.id = pl.lote_id
       where pl.propietario_id = propietario_idf and pl.device_id = device_idf;
    end
$$ language plpgsql;
