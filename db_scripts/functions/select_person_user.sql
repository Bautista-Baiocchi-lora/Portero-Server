create or replace function select_person_user(
    sess_id uuid
)
returns table(email text, fn text, ln text, doc_id text, birth date) as $$
    begin 
        return query
        select a.email, p.first_name, p.last_name, p.doc_id, p.birth_date
        from 
        person p inner join account a on p.id = a.id
        inner join
        user_session us 
        on us.user_id = a.id
        where us.id = sess_id;
    end
$$ language plpgsql;