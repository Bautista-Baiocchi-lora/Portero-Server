create or replace function insert_guardia(
    sess_id uuid, 
    barrio_idf uuid,
    rank int
)
returns void as $$
    declare
    user uuid;
    device text;
    begin 
        select user_id, device_id into user, device from user_session s where s.id = sess_id;

        insert into guardia(user_id, device_id, barrio_id, rank) values (user, device, barrio_idf, rank);
    end
$$ language plpgsql;