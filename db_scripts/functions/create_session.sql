create or replace function create_session(
    account_idf uuid,
    days_till_exp integer
)
returns record as $$
declare
    new_session record;
    exp_date timestamp without time zone default current_timestamp + (days_till_exp * interval '1 day');
    begin 
        insert into account_session(account_id, exp) values (account_idf, exp_date)
        on conflict(account_id) do update set creation_date = current_timestamp, exp = exp_date
        returning id, account_id, creation_date, extract(epoch from exp) INTO new_session;
        return new_session;
    end
$$ language plpgsql;