CREATE TABLE public.barrio
(
    barrio_id SERIAL PRIMARY KEY,
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    name text NOT NULL UNIQUE,
    creation_date timestamp default current_timestamp
)
TABLESPACE pg_default;

ALTER TABLE public.barrio
    OWNER to bautista;