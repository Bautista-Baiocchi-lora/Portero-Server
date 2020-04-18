create or replace function delete_lote(
    lote_idf uuid
)
returns uuid as $$
declare
	deleted_id uuid;
    begin 
       delete from lote l where l.id = lote_idf returning l.id into deleted_id;
	   return deleted_id;
    end
$$ language plpgsql;