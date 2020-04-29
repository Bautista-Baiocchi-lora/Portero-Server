create or replace function delete_lote(
    lote_idf uuid,
    barrio_idf uuid
)
returns uuid as $$
    declare 
    deleted_id uuid;
    begin 
        delete from 
        lote l using lote_in_barrio lib 
        where l.id = lote_idf and lib.barrio_id = barrio_idf
        returning l.id into deleted_id;
        return deleted_id;
    end
$$ language plpgsql;