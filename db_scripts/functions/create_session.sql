create or replace function create_session(
    account_idf uuid,
    device_idf text,
    device_type DEVICE_TYPE,
    days_till_exp integer
)
returns table(session_id uuid, acc_id uuid, device_id text, creation_date timestamp without time zone, exp double precision) as $$
declare
    sess_id uuid;
    exp_date timestamp without time zone default current_timestamp + (days_till_exp * interval '1 day');
    begin 
        insert into device(id, type) values (device_idf, device_type) on conflict(id) do nothing;

        insert into account_session(account_id, device_id, exp) values (account_idf, device_idf, exp_date)
        on conflict(account_id) do update set creation_date = current_timestamp, exp = exp_date, device_id = device_idf
        returning id INTO sess_id;

        return query
        select a.id, a.account_id, a.device_id, a.creation_date, extract(epoch from a.exp) 
        from account_session a where a.id = sess_id;
    end
$$ language plpgsql;