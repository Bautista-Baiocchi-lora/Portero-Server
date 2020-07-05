create or replace function select_invite_as_guardia(
    invite_idf uuid,
    sess_id uuid
)
returns table(id uuid, device_id text, user_id uuid, lote_id uuid, enabled bool, exp timestamp without time zone, creation_date timestamp without time zone) as $$
    begin
        if exists(select 1 from
                        lote l, lote_in_barrio lib, user_session us, guardia g
                        where l.id = lib.lote_id and lib.barrio_id = g.barrio_id and g.user_id = us.user_id 
                        and g.device_id = us.device_id and g.enabled = true)
        then  
            return query   
            select i.* from invite i where i.id = invite_idf;
        end if;
    end
$$ language plpgsql;