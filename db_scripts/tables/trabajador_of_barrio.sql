CREATE TABLE public.trabajador_of_barrio
(
    barrio_id integer REFERENCES barrio (id) ON DELETE CASCADE,
    user_id integer REFERENCES "user" (id) ON DELETE CASCADE,
    creation_date timestamp without time zone default current_timestamp,
    PRIMARY KEY(barrio_id, user_id)
)
TABLESPACE pg_default;

ALTER TABLE public.trabajador_of_barrio
    OWNER to bautista;