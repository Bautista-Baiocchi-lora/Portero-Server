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