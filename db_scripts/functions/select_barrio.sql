create or replace function select_barrio(
    emailf text
)
returns record as $$
declare
    acc record;
    begin 
        select * from account, barrio into acc where email = emailf;
		return acc;
    end
$$ language plpgsql;