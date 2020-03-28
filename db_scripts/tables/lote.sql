CREATE TABLE public.lote
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    name text not null,
    address text not null,
    creation_date timestamp without time zone default current_timestamp
)
TABLESPACE pg_default;

ALTER TABLE public.user
    OWNER to bautista;