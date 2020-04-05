CREATE TABLE public.barrio
(
    id uuid REFERENCES account (id) ON DELETE CASCADE PRIMARY KEY,
    name text NOT NULL UNIQUE
)
TABLESPACE pg_default;

ALTER TABLE public.barrio
    OWNER to bautista;