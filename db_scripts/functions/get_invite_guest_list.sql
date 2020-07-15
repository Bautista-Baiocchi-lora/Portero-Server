create or replace function get_invite_guest_list(
    invite_idf uuid
)
returns table(id uuid, doc_id text, fn text, ln text, invite_id uuid, entered timestamp without time zone, rejected timestamp without time zone, exited timestamp without time zone) as $$
    begin
        return query
        select g.id, g.doc_id, g.first_name, g.last_name, g.invite_id, ge.entered, gr.rejected, gx.exited
        from  
        (guest g inner join invite i on g.invite_id = i.id)
        left join 
        guest_entered ge on ge.guest_id = g.id
		left join
		guest_rejected gr on gr.guest_id = g.id
		left join
		guest_exited gx on gx.guest_id = g.id
        where i.id = invite_idf;
    end
$$ language plpgsql;