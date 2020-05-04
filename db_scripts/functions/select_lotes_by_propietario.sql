create or replace function select_lotes_by_propietario(
    sess_id uuid
)
returns table (lote_id uuid, lote_street text, lote_num int, lote_code int, lote_nickname text, lote_name text, barrio_id uuid, barrio_name text) as $$
    begin 
       return query
       select l.id, l.street, l.num, l.code, p.nickname, lib.name, lib.barrio_id, b.name
       from 
       (user_session s inner join propietario p 
       on s.user_id = p.user_id and s.device_id = p.device_id)
       inner join
       ((lote l inner join lote_in_barrio lib on l.id = lib.lote_id)
       inner join barrio b on b.id = lib.barrio_id)
       on p.lote_id = l.id
       where s.id = sess_id;
    end
$$ language plpgsql;