CREATE TABLE public.propretario_of_lote
(
    user_id integer REFERENCES "user" (id) ON DELETE CASCADE,
    lote_id uuid REFERENCES lote (id) ON DELETE CASCADE,
    creation_date timestamp without time zone default current_timestamp,
    PRIMARY KEY(user_id, lote_id)
)
TABLESPACE pg_default;

ALTER TABLE public.propretario_of_lote
    OWNER to bautista;