create or replace function select_propietario(
    emailf text
)
returns record as $$
declare
    acc record;
    begin 
        select * from account, propietario into acc where email = emailf;
		return acc;
    end
$$ language plpgsql;