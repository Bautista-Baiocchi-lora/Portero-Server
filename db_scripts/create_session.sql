create or replace function create_session(
    account_idf integer
)
returns uuid as $$
declare
    new_session_id uuid;
    begin 
        insert into account_session(account_id) values (account_idf) on conflict(account_id) do update set creation_date = current_timestamp returning session_id INTO new_session_id;
        return new_session_id;
    end
$$ language plpgsql;