
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
        perform insert_person(acc_id, fn, ln, birth, doc_idf);
    end
$$ language plpgsql;

