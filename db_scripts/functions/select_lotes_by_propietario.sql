create or replace function select_lotes_by_propietario(
    acc_id uuid,
    dev_id text
)
returns table (lote_id uuid, lote_street text, lote_num int, lote_code int, lote_nickname text, lote_name text, barrio_id uuid, barrio_name text) as $$
    begin 
       return query
       select l.id, l.street, l.num, l.code, p.nickname, lib.name, lib.barrio_id, b.name
	   from
       (propietario p inner join lote l on p.lote_id = l.id)
       inner join 
       (barrio b inner join lote_in_barrio lib on b.id = lib.barrio_id)
	   on l.id = lib.lote_id
       where p.user_id = acc_id and p.device_id = dev_id and p.enabled = true;
    end
$$ language plpgsql;