CREATE TABLE public.admin
(
    id uuid PRIMARY KEY REFERENCES account (id) ON DELETE CASCADE,
    name text not null unique
)
TABLESPACE pg_default;

ALTER TABLE public.admin
    OWNER to $USER;