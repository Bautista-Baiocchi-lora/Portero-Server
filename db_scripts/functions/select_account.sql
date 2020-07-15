create or replace function select_account(
    emailf text
)
returns table(id uuid, email text, password text, type int) as $$
    declare
    begin 
        return query
        select a.id, a.email, a.password, get_account_type(a.id) 
        from account a 
        where a.email = emailf;
    end
$$ language plpgsql;


create or replace function get_account_type(
    acc_id uuid
)
returns int as $$
    begin 
        if exists(select 1 from propietario p where p.user_id = acc_id)
        then
            return 3;--propietario
        elsif exists(select 1 from guardia g where g.user_id = acc_id)
        then
            return 2;--guardia
        elseif exists(select 1 from barrio b where b.id = acc_id)
        then 
            return 0; --barrio
        else
            return 1;--user
        end if;
    end
$$ language plpgsql;