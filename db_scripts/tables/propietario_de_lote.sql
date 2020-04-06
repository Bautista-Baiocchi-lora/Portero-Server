CREATE TABLE public.propietario_de_lote
(
    lote_id uuid REFERENCES lote (id) ON DELETE CASCADE,
    propiertario_id uuid REFERENCES propietario (id) ON DELETE CASCADE,
    creation_date timestamp without time zone default current_timestamp,
    PRIMARY KEY(lote_id, propiertario_id)
)
TABLESPACE pg_default;

ALTER TABLE public.propietario_de_lote
    OWNER to bautista;
