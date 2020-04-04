create or replace function select_account(
    emailf text
)
returns record as $$
declare
    acc record;
    begin 
        select id, email, password, type from account into acc where email = emailf;
		return acc;
    end
$$ language plpgsql;