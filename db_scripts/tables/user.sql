CREATE TABLE public.user
(
    id integer PRIMARY KEY REFERENCES account (id) ON DELETE CASCADE,
    first_names text not null,
    last_names text not null,
    doc_id text not null,
    doc_type document_type not null,
    device_id text not null,
    creation_date timestamp without time zone default current_timestamp
)
TABLESPACE pg_default;

ALTER TABLE public.user
    OWNER to bautista;