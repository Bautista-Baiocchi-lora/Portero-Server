CREATE TABLE public.account
(
    id SERIAL PRIMARY KEY,
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    creation_date timestamp default current_timestamp
)
TABLESPACE pg_default;

ALTER TABLE public.account
    OWNER to bautista;