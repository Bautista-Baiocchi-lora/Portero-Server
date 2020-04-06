create or replace function select_account(
    emailf text
)
returns table(id uuid, email text, password text, type int) as $$
    begin 
        return query
        select account.id, account.email, account.password, account.type from account where account.email = emailf;
    end
$$ language plpgsql;