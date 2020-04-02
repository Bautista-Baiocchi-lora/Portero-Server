create or replace function select_trabajador(
    emailf text
)
returns record as $$
declare
    acc record;
    begin 
        select * from account, trabajador into acc where email = emailf;
		return acc;
    end
$$ language plpgsql;