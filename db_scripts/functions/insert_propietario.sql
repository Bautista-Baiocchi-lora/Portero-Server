create or replace function insert_propietario(
    emailf text,
    passf text,
    first_namef text,
    last_namef text,
    doc_idf text,
    doc_typef integer,
    device_idf text
)
returns void as $$
declare
    account_id integer;
    begin 
        insert into account(email, password) values (emailf, passf) RETURNING id INTO account_id;
        insert into propietario(id, first_name, last_name, doc_id, doc_type, device_id)
        values (account_id, first_namef, last_namef, doc_idf, doc_typef, device_idf);
    end
$$ language plpgsql;