CREATE TABLE public.barrio
(
    id  PRIMARY KEY REFERENCES account (id) ON DELETE CASCADE,
    name text NOT NULL UNIQUE
)
TABLESPACE pg_default;

ALTER TABLE public.barrio
    OWNER to bautista;