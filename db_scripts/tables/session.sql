CREATE TABLE public.session
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    acc_id uuid REFERENCES account (id) ON DELETE CASCADE,
    last_ip text NOT NULL,
    creation_date timestamp without time zone default current_timestamp
)
TABLESPACE pg_default;

ALTER TABLE public.session
    OWNER to $USER;

