CREATE TABLE public.guest_rejected
(
    guest_id uuid PRIMARY KEY REFERENCES guest (id) ON DELETE RESTRICT,
    guardia_id uuid, 
    device_id text,
    rejected timestamp without time zone default current_timestamp,
    FOREIGN KEY (guardia_id, device_id) REFERENCES guardia(user_id, device_id) ON DELETE RESTRICT
)
TABLESPACE pg_default;

ALTER TABLE public.guest_rejected
    OWNER to $USER;


CREATE FUNCTION can_reject_guest() RETURNS trigger AS $can_reject_guest$
    BEGIN
        if exists(select 1 from guest_exited ge where ge.guest_id = NEW.guest_id) then
            RAISE EXCEPTION 'Guest has already exited.';
        end if;
        if exists(select 1 from guest_entered gen where gen.guest_id = NEW.guest_id) then
            RAISE EXCEPTION 'Guest has already exited.';
        end if;
        return NEW;
    END;
$can_reject_guest$ LANGUAGE plpgsql;

CREATE trigger can_reject_guest BEFORE INSERT ON guest_rejected
    FOR EACH ROW EXECUTE PROCEDURE can_reject_guest();