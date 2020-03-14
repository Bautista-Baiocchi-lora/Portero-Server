create or replace function insert_barrio(
    new_email text,
    new_pass text,
    new_name text
)
returns void as $$
declare
    account_id integer;
    begin 
        insert into account(email, password) values (new_email, new_pass) RETURNING id INTO account_id;
        insert into barrio(id, name) values (account_id, new_name);
    end
$$ language plpgsql;