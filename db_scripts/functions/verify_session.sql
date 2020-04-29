create or replace function verify_session(
    idf uuid
)
returns bool as $$
    begin 
       return exists (select 1 from session s where s.id = idf and s.exp > current_timestamp) = true;
    end
$$ language plpgsql;