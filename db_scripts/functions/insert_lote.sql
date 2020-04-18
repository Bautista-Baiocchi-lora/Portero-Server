create or replace function insert_lote(
    barrio_idf uuid,
    namef text, 
    numf integer,
    streetf text,
    codef integer
)
returns table(id uuid, name text, street text, num int, code int) as $$
declare
    begin 
        insert into lote(barrio_id, name, num, street, code) values (barrio_idf, namef, numf, streetf, codef);

        return query
        select l.id, l.name, l.street, l.num, l.code
        from lote l where l.barrio_id = barrio_idf and l.name = namef;
    end
$$ language plpgsql;