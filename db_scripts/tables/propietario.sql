CREATE TABLE public.propietario
(
    id uuid PRIMARY KEY REFERENCES account (id) ON DELETE CASCADE,
    first_name text not null,
    last_name text not null,
    doc_id text not null,
    doc_type integer not null
)
TABLESPACE pg_default;

ALTER TABLE public.propietario
    OWNER to bautista;