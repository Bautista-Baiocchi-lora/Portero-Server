create or replace function select_invite_as_guardia(
    invite_idf uuid,
    sess_id uuid
)
returns table(id uuid, user_id uuid, lote_id uuid, enabled bool, exp timestamp without time zone, creation_date timestamp without time zone, p_fn text, p_ln text, l_name text, l_street text, l_num integer, l_code integer) as $$
    begin
        if exists(select 1 from
                        lote l, lote_in_barrio lib, user_session us, guardia g
                        where l.id = lib.lote_id and lib.barrio_id = g.barrio_id and g.user_id = us.user_id 
                        and g.device_id = us.device_id and g.enabled = true)
        then  
            return query   
            select i.id, i.user_id, i.lote_id, i.enabled, i.exp, i.creation_date, p.first_name, p.last_name ,lib.name, l.street, l.num, l.code
            from 
            (invite i inner join person p on i.user_id = p.id)
            inner join 
            (lote l inner join lote_in_barrio lib on l.id = lib.lote_id)
            on i.lote_id = l.id
            where i.id = invite_idf;
        end if;
    end
$$ language plpgsql;