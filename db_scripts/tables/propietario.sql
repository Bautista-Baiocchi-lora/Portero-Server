CREATE TABLE public.propietario
(
    id integer PRIMARY KEY REFERENCES account (id) ON DELETE CASCADE,
    first_name text not null,
    last_name text not null,
    doc_id text not null,
    doc_type integer not null,
    device_id text not null
)
TABLESPACE pg_default;

ALTER TABLE public.propietario
    OWNER to bautista;