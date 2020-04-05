CREATE TABLE public.lote
(
    barrio_id uuid REFERENCES barrio (id) ON DELETE CASCADE,
    name text NOT NULL,
    street text NOT NULL,
    num integer NOT NULL,
    code integer NOT NULL,
    PRIMARY KEY (barrio_id, name)
)
TABLESPACE pg_default;

ALTER TABLE public.lote
    OWNER to bautista;