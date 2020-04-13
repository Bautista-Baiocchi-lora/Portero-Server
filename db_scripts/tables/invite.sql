CREATE TABLE public.invite
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    key text not null,
    creation_date timestamp without time zone default current_timestamp
)
TABLESPACE pg_default;

ALTER TABLE public.invite
    OWNER to bautista;