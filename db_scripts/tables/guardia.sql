CREATE TABLE public.guardia
(
    account_id uuid REFERENCES account (id) ON DELETE CASCADE,
    device_id text REFERENCES device (id) ON DELETE CASCADE,
    barrio_id uuid REFERENCES barrio (id) ON DELETE CASCADE,
    rank integer not null,
    creation_date timestamp without time zone default current_timestamp,
    PRIMARY KEY (account_id, device_id)
)
TABLESPACE pg_default;

ALTER TABLE public.guardia
    OWNER to $USER;