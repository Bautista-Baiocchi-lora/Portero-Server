create or replace function create_session(
    account_idf uuid,
    mac_address text,
    days_till_exp integer
)
returns table(session_id uuid, acc_id uuid, device_id text, creation_date timestamp without time zone, exp double precision) as $$
declare
    sess_id uuid;
    exp_date timestamp without time zone default current_timestamp + (days_till_exp * interval '1 day');
    begin 
        insert into account_session(account_id, device_id, exp) values (account_idf, mac_address, exp_date)
        on conflict(account_id) do update set creation_date = current_timestamp, exp = exp_date, device_id = mac_address
        returning id INTO sess_id;

        return query
        select account_session.id, account_session.account_id, account_session.device_id, account_session.creation_date, extract(epoch from account_session.exp) 
        from account_session where account_session.id = sess_id;
    end
$$ language plpgsql;