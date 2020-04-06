CREATE TABLE public.lote
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    barrio_id uuid REFERENCES barrio (id) ON DELETE CASCADE,
    name text unique NOT NULL,
    street text NOT NULL,
    num integer NOT NULL,
    code integer NOT NULL,
    UNIQUE (street, num, code)
)
TABLESPACE pg_default;

ALTER TABLE public.lote
    OWNER to bautista;