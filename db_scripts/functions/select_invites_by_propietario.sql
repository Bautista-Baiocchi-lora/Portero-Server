 create or replace function select_invites_by_propietario(
    acc_id uuid,
    dev_id text
)
returns table(id uuid, lote_id uuid, enabled bool, exp timestamp without time zone, creation_date timestamp without time zone) as $$
    begin
       return query
       select i.id, i.lote_id, i.enabled, i.exp, i.creation_date
       from 
       propietario p inner join invite i 
       on p.user_id = i.user_id and p.device_id = i.device_id and p.lote_id = i.lote_id
       where p.enabled = true and i.enabled = true and p.user_id = acc_id and p.device_id = dev_id;
    end
$$ language plpgsql;