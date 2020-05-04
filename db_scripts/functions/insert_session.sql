create or replace function insert_session(
    acc_id uuid,
    days_till_exp int

)
returns uuid as $$
    declare
    sess_id uuid;
    exp_date timestamp without time zone default current_timestamp + (days_till_exp * interval '1 day');
    begin 
        insert into session (exp) values (exp_date) returning session.id into sess_id;
        return sess_id;
    end
$$ language plpgsql;



create or replace function insert_barrio_session(
    barrio_idf uuid,
    days_till_exp int

)
returns table(session_id uuid, acc_id uuid, creation_date timestamp without time zone, exp double precision) as $$
    declare
    sess_id uuid := insert_session(barrio_idf, days_till_exp);
    begin 
        insert into barrio_session (id, barrio_id) values (sess_id, barrio_idf);

        return query
        select s.id, b.barrio_id, s.creation_date, extract(epoch from s.exp)
        from session s inner join barrio_session b on s.id = b.id
        where s.id = sess_id;
    end
$$ language plpgsql;


create or replace function insert_user_session(
    user_idf uuid,
    device_idf text,
    days_till_exp int

)
returns table(session_id uuid, acc_id uuid, dev_id text, creation_date timestamp without time zone, exp double precision) as $$
    declare
    sess_id uuid := insert_session(user_idf, days_till_exp);
    begin 
        insert into device (id) values (device_idf) on conflict do nothing;
        insert into user_session (id, user_id, device_id) values (sess_id, user_idf, device_idf)
        on conflict (user_id, device_id) do update set id = sess_id;

        return query
        select s.id, u.user_id, u.device_id, s.creation_date, extract(epoch from s.exp)
        from session s inner join user_session u on s.id = u.id
        where s.id = sess_id;
    end
$$ language plpgsql;










