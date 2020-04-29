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
    doc_type integer not null,
    unique(doc_id, doc_type)
)
TABLESPACE pg_default;

ALTER TABLE public.person
    OWNER to bautista;

CREATE TABLE public.account_type
(
    id uuid PRIMARY KEY REFERENCES account (id) ON DELETE CASCADE,
    type integer not null
)
TABLESPACE pg_default;

ALTER TABLE public.account_type
    OWNER to bautista;

CREATE TABLE public.invite
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    encry_key text not null,
    issuer uuid not null REFERENCES account (id) ON DELETE CASCADE,
    creation_date timestamp without time zone default current_timestamp
)
TABLESPACE pg_default;

ALTER TABLE public.invite
    OWNER to bautista;

CREATE TABLE public.barrio
(
    id uuid PRIMARY KEY REFERENCES account (id) ON DELETE CASCADE,
    name text not null unique
)
TABLESPACE pg_default;

ALTER TABLE public.barrio
    OWNER to bautista;

CREATE TABLE public.lote
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    street text NOT NULL,
    num integer NOT NULL,
    code integer NOT NULL,
    creation_date timestamp without time zone default current_timestamp,
    UNIQUE (street, num, code)
)
TABLESPACE pg_default;

ALTER TABLE public.lote
    OWNER to bautista;

CREATE TABLE public.lote_in_barrio
(
    lote_id uuid REFERENCES lote (id) ON DELETE CASCADE,
    barrio_id uuid REFERENCES barrio (id) ON DELETE CASCADE,
    name text not null unique,
    PRIMARY KEY (lote_id, barrio_id)
)
TABLESPACE pg_default;

ALTER TABLE public.lote_in_barrio
    OWNER to bautista;

CREATE TABLE public.device
(
    id text PRIMARY KEY,
    creation_date timestamp without time zone default current_timestamp
)
TABLESPACE pg_default;

ALTER TABLE public.device
    OWNER to bautista;

CREATE TABLE public.session
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    creation_date timestamp without time zone default current_timestamp,
    exp timestamp without time zone not null
)
TABLESPACE pg_default;

ALTER TABLE public.session
    OWNER to bautista;

CREATE TABLE public.barrio_session
(
    id uuid PRIMARY KEY REFERENCES session (id) ON DELETE CASCADE,
    barrio_id uuid REFERENCES barrio (id) ON DELETE CASCADE
)
TABLESPACE pg_default;

ALTER TABLE public.barrio_session
    OWNER to bautista;

CREATE TABLE public.phone_session
(
    id uuid PRIMARY KEY REFERENCES session (id) ON DELETE CASCADE,
    account_id uuid REFERENCES account (id) ON DELETE CASCADE,
    device_id text REFERENCES device (id) ON DELETE CASCADE,
    UNIQUE (account_id, device_id)
)
TABLESPACE pg_default;

ALTER TABLE public.phone_session
    OWNER to bautista;

CREATE TABLE public.guardia
(
    account_id uuid REFERENCES account (id) ON DELETE CASCADE,
    device_id text REFERENCES device (id) ON DELETE CASCADE,
    barrio_id uuid REFERENCES barrio (id) ON DELETE CASCADE,
    rank integer not null,
    creation_date timestamp without time zone default current_timestamp,
    PRIMARY KEY (account_id, device_id)
)
TABLESPACE pg_default;

ALTER TABLE public.guardia
    OWNER to bautista;

CREATE TABLE public.propietario
(
    lote_id uuid REFERENCES lote (id) ON DELETE CASCADE,
    account_id uuid REFERENCES account (id) ON DELETE CASCADE,
    device_id text REFERENCES device (id) ON DELETE CASCADE,
    creation_date timestamp without time zone default current_timestamp,
    PRIMARY KEY (account_id, lote_id, device_id)
)
TABLESPACE pg_default;

ALTER TABLE public.propietario
    OWNER to bautista;

CREATE TABLE public.trabajador
(
    lote_id uuid REFERENCES lote (id) ON DELETE CASCADE,
    account_id uuid REFERENCES account (id) ON DELETE CASCADE,
    device_id text REFERENCES device (id) ON DELETE CASCADE,
    service text not null,
    creation_date timestamp without time zone default current_timestamp,
    PRIMARY KEY (account_id, lote_id, device_id)
)
TABLESPACE pg_default;

ALTER TABLE public.trabajador
    OWNER to bautista;

