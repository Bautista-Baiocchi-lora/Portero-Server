create or replace function select_propietarios_of_lotes(
    lote_ids uuid[]
)
returns table (lote_id uuid, prop_id uuid, first_name text, last_name text, doc_id text, doc_type int) as $$
    begin 
	   return query
       select propietario_of_lote.lote_id, propietario.id, propietario.first_name,
       propietario.last_name, propietario.doc_id, propietario.doc_type
       from propietario_of_lote, propietario where propietario_of_lote.lote_id = any(lote_ids) 
       and propietario_of_lote.propietario_id = propietario.id;
    end
$$ language plpgsql;
