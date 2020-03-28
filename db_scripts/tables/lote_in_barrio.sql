CREATE TABLE public.lote_in_barrio
(
    barrio_id integer REFERENCES barrio (id) ON DELETE CASCADE,
    lote_id uuid REFERENCES lote (id) ON DELETE CASCADE,
    creation_date timestamp without time zone default current_timestamp,
    PRIMARY KEY(barrio_id, lote_id)
)
TABLESPACE pg_default;

ALTER TABLE public.lote_in_barrio
    OWNER to bautista;