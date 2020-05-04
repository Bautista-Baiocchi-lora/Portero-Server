-- BARRIO = 0, USER = 1, GUARDIA = 2
CREATE TABLE public.account_type
(
    id uuid PRIMARY KEY REFERENCES account (id) ON DELETE CASCADE,
    type integer not null
)
TABLESPACE pg_default;

ALTER TABLE public.account_type
    OWNER to $USER;