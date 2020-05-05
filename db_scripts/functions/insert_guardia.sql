create or replace function insert_guardia(
    sess_id uuid, 
    barrio_idf uuid,
    rank int
)
returns void as $$
    declare
    userf uuid;
    devicef text;
    begin 
        select user_id, device_id into userf, devicef from user_session s where s.id = sess_id;

        insert into guardia(user_id, device_id, barrio_id, rank) values (userf, devicef, barrio_idf, rank);
    end
$$ language plpgsql;