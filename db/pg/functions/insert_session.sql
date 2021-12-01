create or replace function insert_session(
    acc_idf uuid,
    days_till_exp int
)
returns table(id uuid, acc_id uuid, exp timestamp without time zone, creation_date timestamp without time zone) as $$
    declare
    exp_date timestamp without time zone default current_timestamp + (days_till_exp * interval '1 day');
    begin 
        return query
        insert into session (acc_id, exp) values (acc_idf, exp_date) returning *;
    end
$$ language plpgsql;