create or replace function insert_propietario_of_lote(
    barrio_idf uuid,
    lote_idf uuid,
    propietario_idf uuid,
    device_idf text,
    lote_nickname text
)
returns void as $$
declare
    begin 
        IF 
            exists(select 1 from lote where barrio_id = barrio_idf and id = lote_idf)
        THEN
            insert into propietario_of_lote(lote_id, propietario_id, device_id, nickname) values (lote_idf, propietario_idf, device_idf, lote_nickname);
        END IF ;
    end
$$ language plpgsql;