CREATE TABLE public.account
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    type integer NOT NULL,
    creation_date timestamp without time zone default current_timestamp
)
TABLESPACE pg_default;

ALTER TABLE public.account
    OWNER to bautista;