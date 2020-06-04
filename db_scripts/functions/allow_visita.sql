create or replace function allow_visita(
    invite_idf uuid,
    session_idf uuid
)
returns bool as $$
    begin
    if exists(select 1 from 
                user_session us inner join guardia g
                on g.device_id = us.device_id and g.user_id = us.user_id
            where us.id = session_idf)
    then
    insert into visita (invite_id) values (invite_idf);
    return true;
    end if;
    return false;
    end
$$ language plpgsql;