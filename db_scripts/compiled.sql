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



CREATE TABLE public.person_document
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    doc_id text not null,
    creation_date timestamp without time zone default current_timestamp
)
TABLESPACE pg_default;

ALTER TABLE public.person_document
    OWNER to bautista;

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
    OWNER to bautista;

CREATE TABLE public.barrio
(
    id uuid PRIMARY KEY REFERENCES account (id) ON DELETE CASCADE,
    name text not null unique
)
TABLESPACE pg_default;

ALTER TABLE public.barrio
    OWNER to bautista;

CREATE TABLE public.session
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    acc_id uuid REFERENCES account (id) ON DELETE CASCADE,
    last_ip text NOT NULL,
    creation_date timestamp without time zone default current_timestamp
)
TABLESPACE pg_default;

ALTER TABLE public.session
    OWNER to bautista;



CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

