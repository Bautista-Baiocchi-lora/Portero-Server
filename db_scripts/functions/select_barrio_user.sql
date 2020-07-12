
create or replace function select_barrio_user(
    sess_id uuid
)
returns table(b_email text, b_name text) as $$
    begin 
        return query
        select a.email, b.name
        from 
        barrio b inner join account a on b.id = a.id
        inner join 
        barrio_session bs
        on bs.barrio_id = b.id
        where bs.id = sess_id;
    end
$$ language plpgsql;

