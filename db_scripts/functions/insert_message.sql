create or replace function insert_message(
)
returns table(message_id uuid, key text) as $$
declare
    new_message uuid;
    begin 
        insert into message(encry_key) values (substr(md5(random()::text), 0, 20)) returning message.id into new_message;
        
        return query
        select id, encry_key from message m where m.id = new_message;
    end
$$ language plpgsql;