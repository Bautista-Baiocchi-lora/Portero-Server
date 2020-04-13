create or replace function register_invite()
returns table(invite_id uuid, encry_key text) as $$
declare
    invite_id uuid;
    begin 
        insert into invite(key) values (substr(md5(random()::text), 0, 20)) returning invite.id into invite_id;
        
        return query
        select id, key from invite where invite.id = invite_id;
    end
$$ language plpgsql;