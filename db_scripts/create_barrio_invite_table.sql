CREATE TABLE public.barrio_invite
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    barrio_id integer REFERENCES account (id) ON DELETE CASCADE,
    creation_date timestamp without time zone default current_timestamp,
    exp timestamp without time zone not null
)
TABLESPACE pg_default;

ALTER TABLE public.barrio_invite
    OWNER to bautista;