CREATE TABLE public.propietario_of_lote
(
    lote_id uuid REFERENCES lote (id) ON DELETE CASCADE,
    propietario_id uuid REFERENCES propietario (id) ON DELETE CASCADE,
    device_id text REFERENCES device (id),
    nickname text,
    creation_date timestamp without time zone default current_timestamp,
    PRIMARY KEY(lote_id, propietario_id)
)
TABLESPACE pg_default;

ALTER TABLE public.propietario_of_lote
    OWNER to bautista;
