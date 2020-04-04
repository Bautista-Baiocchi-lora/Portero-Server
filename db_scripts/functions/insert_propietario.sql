create or replace function insert_propietario(
    emailf text,
    passf text,
    first_namef text,
    last_namef text,
    doc_idf text,
    doc_typef integer
)
returns void as $$
declare
    account_id integer;
    begin 
        insert into account(email, password, type) values (emailf, passf, 1) RETURNING id INTO account_id;
        insert into propietario(id, first_name, last_name, doc_id, doc_type)
        values (account_id, first_namef, last_namef, doc_idf, doc_typef);
    end
$$ language plpgsql;