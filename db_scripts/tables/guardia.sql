CREATE TABLE public.guardia
(
    user_id uuid REFERENCES account (id) ON DELETE CASCADE,
    device_id text REFERENCES device (id) ON DELETE CASCADE,
    barrio_id uuid REFERENCES barrio (id) ON DELETE CASCADE,
    rank integer not null,
    creation_date timestamp without time zone default current_timestamp,
    PRIMARY KEY (user_id, device_id)
)
TABLESPACE pg_default;

ALTER TABLE public.guardia
    OWNER to $USER;


CREATE OR REPLACE FUNCTION can_be_guardia() RETURNS trigger AS $can_be_guardia$
    BEGIN
        if exists(select 1 from guardia g where g.user_id = NEW.user_id) then
            RAISE EXCEPTION 'Already a guardia';
        end if;
        if exists(select 1 from propietario p where p.user_id = NEW.user_id) then
            RAISE EXCEPTION 'Propietario cannot be guardia';
        end if;
        if exists(select 1 from trabajador t where t.user_id = NEW.user_id) then
            RAISE EXCEPTION 'Trabajador cannot be guardia';
        end if;
        return NEW;
    END;
$can_be_guardia$ LANGUAGE plpgsql;


CREATE trigger can_be_guardia BEFORE INSERT ON guardia
    FOR EACH ROW EXECUTE PROCEDURE can_be_guardia();


CREATE OR REPLACE FUNCTION update_account_type_to_guardia() RETURNS trigger AS $update_account_type_to_guardia$
    BEGIN
        perform update_account_type(NEW.user_id, 2);
        return NEW;
    END;
$update_account_type_to_guardia$ LANGUAGE plpgsql;

CREATE trigger update_account_type_to_guardia AFTER INSERT ON guardia
    FOR EACH ROW EXECUTE PROCEDURE update_account_type_to_guardia();

CREATE OR REPLACE FUNCTION revert_account_type_to_user() RETURNS trigger AS $revert_account_type_to_user$
    BEGIN
        perform update_account_type(OLD.user_id, 1);
        return NEW;
    END;
$revert_account_type_to_user$ LANGUAGE plpgsql;

CREATE trigger revert_account_type_to_user AFTER DELETE ON guardia
    FOR EACH ROW EXECUTE PROCEDURE revert_account_type_to_user();