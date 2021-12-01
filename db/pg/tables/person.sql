CREATE TABLE public.person
(
    id uuid PRIMARY KEY REFERENCES account (id) ON DELETE CASCADE,
    first_name text not null,
    last_name text not null,
    birth_date date not null,
    doc_id uuid not null REFERENCES person_document (id) ON DELETE RESTRICT
)
TABLESPACE pg_default;

ALTER TABLE public.person
    OWNER to $USER;