create or replace function select_account(
    emailf text
)
returns table(id uuid, email text, password text, type int) as $$
    begin 
        return query
        select a.id, a.email, a.password, a_type.type
        from
        account a inner join account_type a_type on a.id = a_type.id
        where a.email = emailf;
    end
$$ language plpgsql;