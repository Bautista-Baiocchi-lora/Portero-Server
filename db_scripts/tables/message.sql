CREATE TABLE public.message
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    encry_key text not null
)
TABLESPACE pg_default;

ALTER TABLE public.message
    OWNER to $USER;