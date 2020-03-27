CREATE TABLE public.account_session
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    account_id integer unique REFERENCES account (id) ON DELETE CASCADE,
    creation_date timestamp without time zone default current_timestamp,
    exp timestamp without time zone not null
)
TABLESPACE pg_default;

ALTER TABLE public.account_session
    OWNER to bautista;