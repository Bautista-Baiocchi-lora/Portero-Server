create or replace function insert_propietario_de_lote(
    lote_idf uuid,
    propietario_idf uuid
)
returns void as $$
declare
    begin 
        insert into propietario_de_lote(lote_id, propietario_id) values (lote_idf, propietario_idf);
    end
$$ language plpgsql;