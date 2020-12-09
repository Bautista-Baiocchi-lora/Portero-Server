CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.account
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    creation_date timestamp without time zone default current_timestamp
)
TABLESPACE pg_default;

ALTER TABLE public.account
    OWNER to bautista;

CREATE TABLE public.person
(
    id uuid PRIMARY KEY REFERENCES account (id) ON DELETE CASCADE,
    first_name text not null,
    last_name text not null,
    birth_date date not null,
    doc_id text not null,
    unique(doc_id)
)
TABLESPACE pg_default;

ALTER TABLE public.person
    OWNER to bautista;
