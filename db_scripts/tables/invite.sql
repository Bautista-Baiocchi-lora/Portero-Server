CREATE TABLE public.invite
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    device_id text,
    user_id uuid,
    lote_id uuid,
    enabled boolean default true,
    exp timestamp without time zone not null, 
    creation_date timestamp without time zone default current_timestamp,
    FOREIGN KEY (user_id, lote_id, device_id) REFERENCES propietario(user_id, lote_id, device_id) ON DELETE RESTRICT
)
TABLESPACE pg_default;

ALTER TABLE public.invite
    OWNER to $USER;


CREATE OR REPLACE FUNCTION is_propietario() RETURNS trigger AS $is_propietario$
    BEGIN
        if not exists(select 1 from propietario p where p.user_id = NEW.user_id and p.device_id = NEW.device_id and p.lote_id = NEW.lote_id and p.enabled = true) then
            RAISE EXCEPTION 'Must be a propietario of lote.';
        end if;
        return NEW;
    END;
$is_propietario$ LANGUAGE plpgsql;


CREATE trigger is_propietario BEFORE INSERT ON invite
    FOR EACH ROW EXECUTE PROCEDURE is_propietario();
