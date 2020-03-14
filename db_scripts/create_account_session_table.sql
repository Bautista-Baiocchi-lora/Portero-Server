CREATE TABLE public.account_session
(
    session_id uuid PRIMARY KEY default uuid_generate_v1(),
    account_id integer unique REFERENCES account (id) ON DELETE CASCADE,
    creation_date timestamp default current_timestamp
)
TABLESPACE pg_default;

ALTER TABLE public.account_session
    OWNER to bautista;