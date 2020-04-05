create or replace function insert_lote(
    barrio_idf uuid,
    namef text, 
    numf integer,
    streetf text,
    codef integer
)
returns void as $$
declare
    begin 
        insert into lote(barrio_id, name, num, street, code) values (barrio_idf, namef, numf, streetf, codef);
    end
$$ language plpgsql;