create or replace function insert_barrio(
    emailf text,
    passwordf text, 
    namef text
)
returns void as $$
	declare
    acc_id uuid;
    begin 
        insert into account (email, password) values (emailf, passwordf) returning account.id into acc_id;
        insert into barrio (id, name) values (acc_id, namef);
    end
$$ language plpgsql;