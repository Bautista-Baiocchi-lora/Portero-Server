CREATE TABLE public.visita
(
    invite_id uuid PRIMARY KEY REFERENCES invite (id) ON DELETE RESTRICT,
    entered timestamp without time zone default current_timestamp,
    exited timestamp without time zone default null
)
TABLESPACE pg_default;

ALTER TABLE public.visita
    OWNER to $USER;