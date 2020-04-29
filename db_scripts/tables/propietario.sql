CREATE TABLE public.propietario
(
    lote_id uuid REFERENCES lote (id) ON DELETE CASCADE,
    account_id uuid REFERENCES account (id) ON DELETE CASCADE,
    device_id text REFERENCES device (id) ON DELETE CASCADE,
    creation_date timestamp without time zone default current_timestamp,
    PRIMARY KEY (account_id, lote_id, device_id)
)
TABLESPACE pg_default;

ALTER TABLE public.propietario
    OWNER to $USER;