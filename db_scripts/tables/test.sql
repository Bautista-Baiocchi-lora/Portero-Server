CREATE TABLE public.test
(
    email text NOT NULL UNIQUE,
    password text NOT NULL
)
TABLESPACE pg_default;

ALTER TABLE public.test
    OWNER to bautista;

