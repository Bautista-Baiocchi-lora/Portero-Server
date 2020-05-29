CREATE TABLE public.lote
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    street text NOT NULL,
    num integer NOT NULL,
    code integer NOT NULL,
    creation_date timestamp without time zone default current_timestamp,
    UNIQUE (street, num, code)
)
TABLESPACE pg_default;

ALTER TABLE public.lote
    OWNER to $USER;