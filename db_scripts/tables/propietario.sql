CREATE TABLE public.propietario
(
    lote_id uuid REFERENCES lote (id) ON DELETE CASCADE,
    user_id uuid REFERENCES account (id) ON DELETE CASCADE,
    device_id text REFERENCES device (id) ON DELETE CASCADE,
    nickname text not null,
    enabled boolean default true,
    creation_date timestamp without time zone default current_timestamp,
    PRIMARY KEY (user_id, lote_id, device_id)
)
TABLESPACE pg_default;

ALTER TABLE public.propietario
    OWNER to $USER;


CREATE FUNCTION can_be_propietario() RETURNS trigger AS $can_be_propietario$
    BEGIN
        if exists(select 1 from propietario p where p.device_id = NEW.device_id and p.nickname = NEW.nickname and p.enabled = true) then
            RAISE EXCEPTION 'Lote nickname taken.';
        end if;
        if exists(select 1 from guardia g where g.user_id = NEW.user_id) then
            RAISE EXCEPTION 'A guardia cannot be a propietario.';
        end if;
        return NEW;
    END;
$can_be_propietario$ LANGUAGE plpgsql;

CREATE trigger can_be_propietario BEFORE INSERT OR UPDATE ON propietario
    FOR EACH ROW EXECUTE PROCEDURE can_be_propietario();