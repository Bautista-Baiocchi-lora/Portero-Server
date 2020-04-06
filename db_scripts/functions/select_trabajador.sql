create or replace function select_trabajador(
    emailf text
)
returns table(id uuid, email text, password text, type int, creation_date timestamp without time zone, first_name text, last_name text, doc_id text, doc_type int) as $$
    begin 
        return query
        select account.id, account.email, account.password, account.type, account.creation_date,
        trabajador.first_name, trabajador.last_name, trabajador.doc_id, trabajador.doc_type
        from account, trabajador where account.email = emailf;
    end
$$ language plpgsql;