CREATE TABLE public.session
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    acc_id uuid not null REFERENCES account (id) ON DELETE CASCADE,
    creation_date timestamp without time zone default current_timestamp,
    exp timestamp without time zone not null
)
TABLESPACE pg_default;

ALTER TABLE public.session
    OWNER to $USER;

