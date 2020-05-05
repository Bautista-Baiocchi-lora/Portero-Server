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

-- BARRIO = 0, USER = 1, GUARDIA = 2
CREATE TABLE public.account_type
(
    id uuid PRIMARY KEY REFERENCES account (id) ON DELETE CASCADE,
    type integer not null
)
TABLESPACE pg_default;

ALTER TABLE public.account_type
    OWNER to bautista;

CREATE TABLE public.message
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    encry_key text not null,
    issuer uuid not null REFERENCES account (id) ON DELETE CASCADE,
    creation_date timestamp without time zone default current_timestamp
)
TABLESPACE pg_default;

ALTER TABLE public.message
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
    name text not null,
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

CREATE TABLE public.user_session
(
    id uuid PRIMARY KEY REFERENCES session (id) ON DELETE CASCADE,
    user_id uuid REFERENCES account_type (id) ON DELETE CASCADE,
    device_id text REFERENCES device (id) ON DELETE CASCADE,
    UNIQUE (user_id, device_id)
)
TABLESPACE pg_default;

ALTER TABLE public.user_session
    OWNER to bautista;


CREATE FUNCTION is_user() RETURNS trigger AS $is_user$
    BEGIN
        if not exists(select 1 from account_type t where t.id = NEW.user_id and t.type > 0) then
            RAISE EXCEPTION 'Account is not of type user';
        end if;
        return NEW;
    END;
$is_user$ LANGUAGE plpgsql;

CREATE trigger is_user BEFORE INSERT OR UPDATE ON user_session
    FOR EACH ROW EXECUTE PROCEDURE is_user();

CREATE TABLE public.guardia
(
    user_id uuid REFERENCES account (id) ON DELETE CASCADE,
    device_id text REFERENCES device (id) ON DELETE CASCADE,
    barrio_id uuid REFERENCES barrio (id) ON DELETE CASCADE,
    rank integer not null,
    creation_date timestamp without time zone default current_timestamp,
    PRIMARY KEY (user_id, device_id)
)
TABLESPACE pg_default;

ALTER TABLE public.guardia
    OWNER to bautista;


CREATE OR REPLACE FUNCTION can_be_guardia() RETURNS trigger AS $can_be_guardia$
    BEGIN
        if exists(select 1 from guardia g where g.user_id = NEW.user_id) then
            RAISE EXCEPTION 'Already a guardia';
        end if;
        if exists(select 1 from propietario p where p.user_id = NEW.user_id) then
            RAISE EXCEPTION 'Propietario cannot be guardia';
        end if;
        if exists(select 1 from trabajador t where t.user_id = NEW.user_id) then
            RAISE EXCEPTION 'Trabajador cannot be guardia';
        end if;
        return NEW;
    END;
$can_be_guardia$ LANGUAGE plpgsql;


CREATE trigger can_be_guardia BEFORE INSERT ON guardia
    FOR EACH ROW EXECUTE PROCEDURE can_be_guardia();


CREATE OR REPLACE FUNCTION update_account_type_to_guardia() RETURNS trigger AS $update_account_type_to_guardia$
    BEGIN
        perform update_account_type(NEW.user_id, 2);
        return NEW;
    END;
$update_account_type_to_guardia$ LANGUAGE plpgsql;

CREATE trigger update_account_type_to_guardia AFTER INSERT ON guardia
    FOR EACH ROW EXECUTE PROCEDURE update_account_type_to_guardia();

CREATE OR REPLACE FUNCTION revert_account_type_to_user() RETURNS trigger AS $revert_account_type_to_user$
    BEGIN
        perform update_account_type(OLD.user_id, 1);
        return NEW;
    END;
$revert_account_type_to_user$ LANGUAGE plpgsql;

CREATE trigger revert_account_type_to_user AFTER DELETE ON guardia
    FOR EACH ROW EXECUTE PROCEDURE revert_account_type_to_user();

CREATE TABLE public.propietario
(
    lote_id uuid REFERENCES lote (id) ON DELETE CASCADE,
    user_id uuid REFERENCES account (id) ON DELETE CASCADE,
    device_id text REFERENCES device (id) ON DELETE CASCADE,
    nickname text not null,
    creation_date timestamp without time zone default current_timestamp,
    PRIMARY KEY (user_id, lote_id, device_id)
)
TABLESPACE pg_default;

ALTER TABLE public.propietario
    OWNER to bautista;


CREATE FUNCTION can_be_propietario() RETURNS trigger AS $can_be_propietario$
    BEGIN
        if exists(select 1 from propietario p where p.lote_id = NEW.lote_id and p.nickname = NEW.nickname) then
            RAISE EXCEPTION 'Lote Nickname taken';
        end if;
        if exists(select 1 from guardia g where g.user_id = NEW.user_id) then
            RAISE EXCEPTION 'A guardia cannot be a propietario';
        end if;
        return NEW;
    END;
$can_be_propietario$ LANGUAGE plpgsql;

CREATE trigger can_be_propietario BEFORE INSERT OR UPDATE ON propietario
    FOR EACH ROW EXECUTE PROCEDURE can_be_propietario();

CREATE TABLE public.trabajador
(
    lote_id uuid REFERENCES lote (id) ON DELETE CASCADE,
    user_id uuid REFERENCES account (id) ON DELETE CASCADE,
    device_id text REFERENCES device (id) ON DELETE CASCADE,
    service text not null,
    creation_date timestamp without time zone default current_timestamp,
    PRIMARY KEY (user_id, lote_id, device_id)
)
TABLESPACE pg_default;

ALTER TABLE public.trabajador
    OWNER to bautista;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create or replace function insert_barrio(
    emailf text,
    passwordf text, 
    namef text
)
returns void as $$
	declare
    acc_id uuid;
    begin 
        insert into account (email, password) values (emailf, passwordf) returning account.id into acc_id;
        insert into account_type (id, type) values (acc_id, 0);
        insert into barrio (id, name) values (acc_id, namef);
    end
$$ language plpgsql;

create or replace function insert_person(
    acc_id uuid,
    fn text,
    ln text,
    birth date,
    doc_idf text,
    doc_typef int
)
returns void as $$
    begin 
        insert into person (id, first_name, last_name, birth_date, doc_id, doc_type) values (acc_id, fn, ln, birth, doc_idf, doc_typef);
    end
$$ language plpgsql;


create or replace function insert_user(
    emailf text,
    passwordf text,
    fn text,
    ln text,
    birth date,
    doc_idf text,
    doc_typef int
)
returns void as $$
	declare
    acc_id uuid;
    begin 
        insert into account (email, password) values (emailf, passwordf) returning account.id into acc_id;
        insert into account_type (id, type) values (acc_id, 1);
        perform insert_person(acc_id, fn, ln, birth, doc_idf, doc_typef);
    end
$$ language plpgsql;



create or replace function select_account(
    emailf text
)
returns table(id uuid, email text, password text, type int) as $$
    begin 
        return query
        select a.id, a.email, a.password, a_type.type
        from
        account a inner join account_type a_type on a.id = a_type.id
        where a.email = emailf;
    end
$$ language plpgsql;

create or replace function insert_session(
    acc_id uuid,
    days_till_exp int

)
returns uuid as $$
    declare
    sess_id uuid;
    exp_date timestamp without time zone default current_timestamp + (days_till_exp * interval '1 day');
    begin 
        insert into session (exp) values (exp_date) returning session.id into sess_id;
        return sess_id;
    end
$$ language plpgsql;



create or replace function insert_barrio_session(
    barrio_idf uuid,
    days_till_exp int

)
returns table(session_id uuid, acc_id uuid, creation_date timestamp without time zone, exp double precision) as $$
    declare
    sess_id uuid := insert_session(barrio_idf, days_till_exp);
    begin 
        insert into barrio_session (id, barrio_id) values (sess_id, barrio_idf);

        return query
        select s.id, b.barrio_id, s.creation_date, extract(epoch from s.exp)
        from session s inner join barrio_session b on s.id = b.id
        where s.id = sess_id;
    end
$$ language plpgsql;


create or replace function insert_user_session(
    user_idf uuid,
    device_idf text,
    days_till_exp int

)
returns table(session_id uuid, acc_id uuid, dev_id text, creation_date timestamp without time zone, exp double precision) as $$
    declare
    sess_id uuid := insert_session(user_idf, days_till_exp);
    begin 
        insert into device (id) values (device_idf) on conflict do nothing;
        insert into user_session (id, user_id, device_id) values (sess_id, user_idf, device_idf)
        on conflict (user_id, device_id) do update set id = sess_id;

        return query
        select s.id, u.user_id, u.device_id, s.creation_date, extract(epoch from s.exp)
        from session s inner join user_session u on s.id = u.id
        where s.id = sess_id;
    end
$$ language plpgsql;












create or replace function verify_session(
    idf uuid
)
returns bool as $$
    begin 
       return exists (select 1 from session s where s.id = idf and s.exp > current_timestamp);
    end
$$ language plpgsql;

create or replace function insert_lote(
    barrio_idf uuid,
    namef text, 
    numf integer,
    streetf text,
    codef integer
)
returns table(id uuid, name text, street text, num int, code int) as $$
    declare
    new_lote uuid;
    begin 
        insert into lote (street, num, code) values (streetf, numf, codef) returning lote.id into new_lote;

        insert into lote_in_barrio (lote_id, barrio_id, name) values (new_lote, barrio_idf, namef);

        return query
        select l.id, lib.name, l.street, l.num, l.code
        from 
        lote l inner join lote_in_barrio lib on l.id = lib.lote_id
        where l.id = new_lote;
    end
$$ language plpgsql;

create or replace function delete_lote(
    lote_idf uuid,
    barrio_idf uuid
)
returns uuid as $$
    declare 
    deleted_id uuid;
    begin 
        delete from 
        lote l using lote_in_barrio lib 
        where l.id = lote_idf and lib.barrio_id = barrio_idf
        returning l.id into deleted_id;
        return deleted_id;
    end
$$ language plpgsql;

create or replace function insert_message(
    issuerf uuid
)
returns table(message_id uuid, key text) as $$
declare
    new_message uuid;
    begin 
        insert into message(encry_key, issuer) values (substr(md5(random()::text), 0, 20), issuerf) returning message.id into new_message;
        
        return query
        select id, encry_key from message m where m.id = new_message;
    end
$$ language plpgsql;

create or replace function insert_guardia(
    sess_id uuid, 
    barrio_idf uuid,
    rank int
)
returns void as $$
    declare
    user uuid;
    device text;
    begin 
        select user_id, device_id into user, device from user_session s where s.id = sess_id;

        insert into guardia(user_id, device_id, barrio_id, rank) values (user, device, barrio_idf, rank);
    end
$$ language plpgsql;

create or replace function insert_propietario(
    barrio_idf uuid,
    lote_idf uuid,
    propietario_idf uuid,
    device_idf text,
    lote_nickname text
)
returns void as $$
declare
    begin 
        insert into propietario(lote_id, user_id, device_id, nickname) values (lote_idf, propietario_idf, device_idf, lote_nickname);
    end
$$ language plpgsql;

create or replace function select_lotes_by_barrio(
    barrio_idf uuid
)
returns table (prop_id uuid, email text, prop_fn text, prop_ln text, birth date, doc_id text, doc_type int, prop_since timestamp without time zone, lote_id uuid, lote_street text, lote_num int, lote_code int, lote_name text) as $$
    begin 
        return query
        select
        a.id, a.email, p.first_name, p.last_name, p.birth_date, p.doc_id, p.doc_type, prop.creation_date, l.id, l.street, l.num, l.code, lib.name 
        from 
        (account a inner join person p on a.id = p.id)
        right join 
        (propietario prop right join (lote l inner join lote_in_barrio lib on l.id = lib.lote_id)
        on prop.lote_id = l.id)
        on a.id = prop.user_id
        where lib.barrio_id = barrio_idf;
    end
$$ language plpgsql;

create or replace function select_lotes_by_propietario(
    sess_id uuid
)
returns table (lote_id uuid, lote_street text, lote_num int, lote_code int, lote_nickname text, lote_name text, barrio_id uuid, barrio_name text) as $$
    begin 
       return query
       select l.id, l.street, l.num, l.code, p.nickname, lib.name, lib.barrio_id, b.name
       from 
       (user_session s inner join propietario p 
       on s.user_id = p.user_id and s.device_id = p.device_id)
       inner join
       ((lote l inner join lote_in_barrio lib on l.id = lib.lote_id)
       inner join barrio b on b.id = lib.barrio_id)
       on p.lote_id = l.id
       where s.id = sess_id;
    end
$$ language plpgsql;

create or replace function update_account_type(
    acc_idf uuid,
    new_type int
)
returns void as $$
    begin 
        UPDATE account_type a set type = new_type where a.id = acc_idf;
    end
$$ language plpgsql;

