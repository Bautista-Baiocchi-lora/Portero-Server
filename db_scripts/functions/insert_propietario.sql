create or replace function insert_propietario(
    barrio_idf uuid,
    lote_idf uuid,
    propietario_idf uuid,
    device_idf text,
    lote_nickname text
)
returns void as $$
declare
    begin 
        insert into propietario(lote_id, user_id, device_id, nickname) values (lote_idf, propietario_idf, device_idf, lote_nickname);
    end
$$ language plpgsql;