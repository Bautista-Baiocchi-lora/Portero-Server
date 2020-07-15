CREATE TABLE public.user_session
(
    id uuid PRIMARY KEY REFERENCES session (id) ON DELETE CASCADE,
    user_id uuid REFERENCES account (id) ON DELETE CASCADE,
    device_id text REFERENCES device (id) ON DELETE CASCADE,
    UNIQUE (user_id, device_id)
)
TABLESPACE pg_default;

ALTER TABLE public.user_session
    OWNER to $USER;


CREATE FUNCTION is_user() RETURNS trigger AS $is_user$
    BEGIN
        if get_account_type(NEW.user_id) < 1 then
            RAISE EXCEPTION 'Account is not of type user';
        end if;
        return NEW;
    END;
$is_user$ LANGUAGE plpgsql;

CREATE trigger is_user BEFORE INSERT OR UPDATE ON user_session
    FOR EACH ROW EXECUTE PROCEDURE is_user();