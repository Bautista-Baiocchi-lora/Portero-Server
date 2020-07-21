create or replace function select_lotes_by_barrio(
    barrio_idf uuid
)
returns table (id uuid, street text, num int, code int, name text) as $$
    begin 
        return query
        select l.id, l.street, l.num, l.code, lib.name 
        from 
        lote l inner join lote_in_barrio lib 
        on l.id = lib.lote_id
        where lib.barrio_id = barrio_idf;
    end
$$ language plpgsql;