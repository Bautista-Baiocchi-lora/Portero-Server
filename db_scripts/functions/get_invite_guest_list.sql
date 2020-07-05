create or replace function get_invite_guest_list(
    invite_idf uuid
)
returns table(g_id uuid, g_doc text, g_fn text, g_ln text) as $$
    begin
        return query
        select g.id, g.doc_id, g.first_name, g.last_name
        from 
        invite i right join guest g on i.id = g.invite_id
        where i.id = invite_idf;
    end
$$ language plpgsql;