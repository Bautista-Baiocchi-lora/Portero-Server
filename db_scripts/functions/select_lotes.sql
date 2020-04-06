create or replace function select_lotes(
    barrio_idf uuid
)
returns record as $$
declare
    lotes record;
    begin 
       select * from lote, propietario_de_lote, propietario into lotes where barrio_id = barrio_idf;
       return lotes;
    end
$$ language plpgsql;