CREATE TABLE public.person_document
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    doc_id text not null,
    creation_date timestamp without time zone default current_timestamp
)
TABLESPACE pg_default;

ALTER TABLE public.person_document
    OWNER to $USER;