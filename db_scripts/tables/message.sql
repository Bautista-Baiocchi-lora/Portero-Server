CREATE TABLE public.invite
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    encry_key text not null,
    issuer uuid not null REFERENCES account (id) ON DELETE CASCADE,
    creation_date timestamp without time zone default current_timestamp
)
TABLESPACE pg_default;

ALTER TABLE public.invite
    OWNER to $USER;