create or replace function create_barrio_invite(
    barrio_idf integer
)
returns uuid as $$
declare
    invite_id uuid;
    begin 
        insert into barrio_invite(barrio_id) values (barrio_idf)
        on conflict(barrio_id) do update set id = uuid_generate_v1()
        returning id INTO invite_id;
        return invite_id;
    end
$$ language plpgsql;