create or replace function insert_barrio(
    new_email text,
    new_pass text,
    new_name text
)
returns void as $$
declare
    account_id integer;
    begin 
        insert into account(email, password, type) values (new_email, new_pass, 0) RETURNING id INTO account_id;
        insert into barrio(id, name) values (account_id, new_name);
    end
$$ language plpgsql;