create or replace function insert_barrio(
    new_email text,
    new_pass text,
    new_name text
)
returns void as $$
    begin 
        insert into barrio(email, password, name) values (new_email, new_pass, new_name);
    end
$$ language plpgsql;