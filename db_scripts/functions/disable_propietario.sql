create or replace function disable_propietario(
    barrio_idf uuid,
    prop_id uuid, 
    prop_dev_id text,
    prop_lote_id uuid
)
returns bool as $$
    begin
        update propietario p 
        set enabled = false
        where p.user_id = prop_id and p.device_id = prop_dev_id and p.lote_id = prop_lote_id
        and exists(select 1 from 
                    lote_in_barrio lib 
                    where lib.barrio_id = barrio_idf and lib.lote_id = prop_lote_id);

        return FOUND;
    end
$$ language plpgsql;