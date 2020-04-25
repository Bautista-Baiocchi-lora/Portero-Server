create or replace function validate_session(
    idf uuid,
    device_idf text,
    account_idf uuid
)
returns bool as $$
declare
    begin 
       if 
       exists(select 1 from account_session where id = idf and device_id = device_idf and account_id = account_idf)
       then
       return true;
       else 
       return false;
       end if;
    end
$$ language plpgsql;