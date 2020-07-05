create or replace function insert_invite(
    acc_id uuid, 
    dev_id text,
    doc_idf text,
    fn text,
    ln text,
    lote uuid,
    secs_till_exp integer
)
returns uuid as $$
	declare
    exp_date timestamp without time zone default current_timestamp + (secs_till_exp * interval '1 second');
    inv_id uuid;
    begin 
        if exists(select 1 from propietario p where p.user_id = acc_id and p.device_id = dev_id  and p.enabled = true)
        then
            insert into invite(user_id, device_id, lote_id, exp) values (acc_id, dev_id, lote, exp_date) returning invite.id into inv_id;
            insert into guest (invite_id, first_name, last_name, doc_id) values (inv_id, fn, ln, doc_idf);
        end if;
    return inv_id;
    end
$$ language plpgsql;
