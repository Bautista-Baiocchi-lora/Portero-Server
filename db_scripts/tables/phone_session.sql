CREATE TABLE public.phone_session
(
    id uuid PRIMARY KEY REFERENCES session (id) ON DELETE CASCADE,
    account_id uuid REFERENCES account (id) ON DELETE CASCADE,
    device_id text REFERENCES device (id) ON DELETE CASCADE,
    UNIQUE (account_id, device_id)
)
TABLESPACE pg_default;

ALTER TABLE public.phone_session
    OWNER to $USER;