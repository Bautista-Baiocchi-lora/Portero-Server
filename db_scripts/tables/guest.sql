CREATE TABLE public.guest
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    invite_id uuid REFERENCES invite (id) ON DELETE RESTRICT,
    doc_id text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL
)
TABLESPACE pg_default;

ALTER TABLE public.guest
    OWNER to $USER;