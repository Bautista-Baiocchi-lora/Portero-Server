CREATE TABLE public.propietario
(
    lote_id uuid REFERENCES lote (id) ON DELETE CASCADE,
    user_id uuid REFERENCES account (id) ON DELETE CASCADE,
    device_id text REFERENCES device (id) ON DELETE CASCADE,
    nickname text not null,
    creation_date timestamp without time zone default current_timestamp,
    PRIMARY KEY (user_id, lote_id, device_id)
)
TABLESPACE pg_default;

ALTER TABLE public.propietario
    OWNER to bautista;


CREATE FUNCTION is_allowed() RETURNS trigger AS $is_allowed$
    BEGIN
        if exists(select 1 from propietario p where p.lote_id = NEW.lote_id and p.nickname = NEW.nickname) then
            RAISE EXCEPTION 'Lote Nickname taken';
        end if;
        if exists(select 1 from guardia g where g.user_id = NEW.user_id) then
            RAISE EXCEPTION 'A guardia cannot be a propietario';
        end if;
        return NEW;
    END;
$is_allowed$ LANGUAGE plpgsql;

CREATE trigger is_allowed BEFORE INSERT OR UPDATE ON propietario
    FOR EACH ROW EXECUTE PROCEDURE is_allowed();