CREATE TABLE public.session
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    creation_date timestamp without time zone default current_timestamp,
    exp timestamp without time zone not null
)
TABLESPACE pg_default;

ALTER TABLE public.session
    OWNER to $USER;