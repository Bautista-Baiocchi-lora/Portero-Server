create or replace function select_account_password(
    emailf text
)
returns record as $$
declare
    acc record;
    begin 
        select id, password from account into acc where email = emailf;
		return acc;
    end
$$ language plpgsql;