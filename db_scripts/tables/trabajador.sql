CREATE TABLE public.trabajador
(
    id uuid PRIMARY KEY REFERENCES account (id) ON DELETE CASCADE,
    first_name text not null,
    last_name text not null,
    doc_id text not null,
    doc_type integer not null,
    unique(doc_id, doc_type)
)
TABLESPACE pg_default;

ALTER TABLE public.trabajador
    OWNER to bautista;