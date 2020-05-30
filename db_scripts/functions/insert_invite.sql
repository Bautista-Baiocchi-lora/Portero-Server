create or replace function insert_invite(
    acc_id uuid, 
    dev_id text,
    doc_idf text,
    fn text,
    ln text,
    lote uuid
)
returns uuid as $$
	declare
    guest_idf uuid;
    invite_id uuid;
    begin 
        insert into guest (first_name, last_name, doc_id) values (fn, ln, doc_idf) returning guest.id into guest_idf;

        insert into invite (user_id, lote_id, device_id, guest_id) values (acc_id, lote, dev_id, guest_idf) returning invite.id into invite_id;
        return invite_id;
    end
$$ language plpgsql;
