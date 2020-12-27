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
    acc_id uuid not null REFERENCES account (id) ON DELETE CASCADE,
    creation_date timestamp without time zone default current_timestamp,
    exp timestamp without time zone not null
)
TABLESPACE pg_default;

ALTER TABLE public.session
    OWNER to bautista;



CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create or replace function insert_session(
    acc_idf uuid,
    days_till_exp int
)
returns table(id uuid, acc_id uuid, exp timestamp without time zone), creation_date timestamp without time zone) as $$
    declare
    exp_date timestamp without time zone default current_timestamp + (days_till_exp * interval '1 day');
    begin 
        return query
        insert into session (acc_id, exp) values (acc_idf, exp_date) returning *;
    end
$$ language plpgsql;

