create or replace function update_account_type(
    acc_idf uuid,
    new_type int
)
returns void as $$
    begin 
        UPDATE account_type a set type = new_type where a.id = acc_idf;
    end
$$ language plpgsql;