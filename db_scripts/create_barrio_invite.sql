create or replace function create_barrio_invite(
    barrio_idf integer,
    mins_till_exp integer
)
returns uuid as $$
declare
    invite_id uuid;
    exp_date timestamp without time zone default current_timestamp + (mins_till_exp * interval '1 minute');
    begin 
        insert into barrio_invite(barrio_id, exp) values (barrio_idf, exp_date)
        returning id INTO invite_id;
        return invite_id;
    end
$$ language plpgsql;