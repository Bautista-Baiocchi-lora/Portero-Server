create or replace function insert_person(
    acc_id uuid,
    fn text,
    ln text,
    birth date,
    doc_idf text
)
returns void as $$
    begin 
        insert into person (id, first_name, last_name, birth_date, doc_id, doc_type) values (acc_id, fn, ln, birth, doc_idf, 1);--REMOVE TYPE
    end
$$ language plpgsql;


create or replace function insert_user(
    emailf text,
    passwordf text,
    fn text,
    ln text,
    birth date,
    doc_idf text
)
returns void as $$
	declare
    acc_id uuid;
    begin 
        insert into account (email, password) values (emailf, passwordf) returning account.id into acc_id;
        insert into account_type (id, type) values (acc_id, 1);
        perform insert_person(acc_id, fn, ln, birth, doc_idf);
    end
$$ language plpgsql;

