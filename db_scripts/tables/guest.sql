CREATE TABLE public.guest
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    doc_id text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    creation_date timestamp without time zone default current_timestamp
)
TABLESPACE pg_default;

ALTER TABLE public.guest
    OWNER to $USER;