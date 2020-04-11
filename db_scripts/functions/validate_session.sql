create or replace function validate_session(
    idf text,
    mac_address text,
    account_idf text
)
returns bool as $$
declare
    account_id uuid;
    begin 
       select exists(select 1 from account_session where id = idf and device_id = mac_address and account_id = account_idf);
    end
$$ language plpgsql;