create type invited_guest as (first_name text, last_name text, doc_id text);

create or replace function insert_invite(
    acc_id uuid, 
    dev_id text,
    guests invited_guest[],
    lote uuid,
    secs_till_exp integer
)
returns uuid as $$
	declare
    exp_date timestamp without time zone default current_timestamp + (secs_till_exp * interval '1 second');
    inv_id uuid;
    g invited_guest;
    begin
        insert into invite(user_id, device_id, lote_id, exp) values (acc_id, dev_id, lote, exp_date) returning invite.id into inv_id;
        FOREACH g in ARRAY guests
        LOOP
            insert into guest (invite_id, first_name, last_name, doc_id) values (inv_id, g.first_name, g.last_name, g.doc_id);
        END LOOP;
    return inv_id;
    end
$$ language plpgsql;
