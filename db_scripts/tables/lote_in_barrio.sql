CREATE TABLE public.lote_in_barrio
(
    lote_id uuid REFERENCES lote (id) ON DELETE CASCADE,
    barrio_id uuid REFERENCES barrio (id) ON DELETE CASCADE,
    name text not null unique,
    PRIMARY KEY (lote_id, barrio_id)
)
TABLESPACE pg_default;

ALTER TABLE public.lote_in_barrio
    OWNER to $USER;