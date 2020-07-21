create or replace function disable_guardia(
    barrio_idf uuid,
    guardia_idf uuid, 
    guardia_dev_id text
)
returns bool as $$
    begin
        update guardia g
        set enabled = false
        where g.user_id = guardia_idf and g.device_id = guardia_dev_id 
        and g.barrio_id = barrio_idf;

        return FOUND;
    end
$$ language plpgsql;