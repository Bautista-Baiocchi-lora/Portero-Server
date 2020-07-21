CREATE TABLE public.guest_exited
(
    guest_id uuid PRIMARY KEY REFERENCES guest (id) ON DELETE RESTRICT,
    guardia_id uuid, 
    device_id text,
    exited timestamp without time zone default current_timestamp,
    FOREIGN KEY (guardia_id, device_id) REFERENCES guardia(user_id, device_id) ON DELETE RESTRICT
)
TABLESPACE pg_default;

ALTER TABLE public.guest_exited
    OWNER to $USER;


CREATE FUNCTION can_guest_exit() RETURNS trigger AS $can_guest_exit$
    BEGIN
        if not exists(select 1 from guest_entered gen where gen.guest_id = NEW.guest_id) then
            RAISE EXCEPTION 'Guest never entered.';
        end if;
        return NEW;
    END;
$can_guest_exit$ LANGUAGE plpgsql;

CREATE trigger can_guest_exit BEFORE INSERT ON guest_exited
    FOR EACH ROW EXECUTE PROCEDURE can_guest_exit();