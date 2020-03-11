create or replace function insert_barrio(
    emailadd text,
    fname text,
    pass text
)
returns text as $$
declare id uuid;
begin 
    select * 
    insert into barrio(barrio_id,email,password,name)
    values (emailadd,fname,lname,rol,pass,current_date,false);
    
    if found then
        id:=uuid_generate_v1();
        insert into email_confirmation(email,uuid)
        values (emailadd,id);
        return id;
    end if;
end
$$ language plpgsql;