create or replace function insert_lote(
    barrio_idf uuid,
    namef text, 
    numf integer,
    streetf text,
    codef integer
)
returns table(id uuid, name text, street text, num int, code int) as $$
    declare
    new_lote uuid;
    begin 
        insert into lote (street, num, code) values (streetf, numf, codef) returning lote.id into new_lote;

        insert into lote_in_barrio (lote_id, barrio_id, name) values (new_lote, barrio_idf, namef);

        return query
        select l.id, lib.name, l.street, l.num, l.code
        from 
        lote l inner join lote_in_barrio lib on l.id = lib.lote_id
        where l.id = new_lote;
    end
$$ language plpgsql;