CREATE TABLE public.trabajador
(
    lote_id uuid REFERENCES lote (id) ON DELETE CASCADE,
    account_id uuid REFERENCES account (id) ON DELETE CASCADE,
    device_id text REFERENCES device (id) ON DELETE CASCADE,
    service text not null,
    creation_date timestamp without time zone default current_timestamp,
    PRIMARY KEY (account_id, lote_id, device_id)
)
TABLESPACE pg_default;

ALTER TABLE public.trabajador
    OWNER to $USER;