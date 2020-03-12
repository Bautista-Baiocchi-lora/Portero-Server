CREATE TABLE public.barrio
(
    barrio_id SERIAL PRIMARY KEY,
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    name text NOT NULL UNIQUE
)
TABLESPACE pg_default;

ALTER TABLE public.barrio
    OWNER to bautista;