 create or replace function validate_invite(
    invite_idf uuid,
    session_idf uuid
)
returns table(i_id uuid, p_fn text, p_ln text, p_doc text, p_birth date, lote_id uuid, lote_name text, lote_street text, lote_num integer, lote_code integer, g_doc text, g_fn text, g_ln text) as $$
    begin 
        if exists(select 1 from 
                        ((invite i inner join lote_in_barrio lib on i.lote_id = lib.lote_id)
                        inner join 
                        (guardia g inner join user_session us on g.user_id = us.user_id and g.device_id = us.device_id)
                        on lib.barrio_id = g.barrio_id)
                    where us.id = session_idf)
        then
            return query 
            select i.id, p.first_name, p.last_name, p.doc_id, p.birth_date, l.id, lib.name, l.street, l.num, l.code, gu.doc_id, gu.first_name, gu.last_name
            from 
            person p, 
            (guest gu inner join invite i on i.guest_id = gu.id), 
            (lote l inner join lote_in_barrio lib on l.id = lib.lote_id)
            where i.lote_id = l.id and i.user_id = p.id and i.id = invite_idf;
        end if;
    end
$$ language plpgsql;