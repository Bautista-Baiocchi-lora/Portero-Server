CREATE TABLE public.barrio_session
(
    id uuid PRIMARY KEY REFERENCES session (id) ON DELETE CASCADE,
    barrio_id uuid REFERENCES barrio (id) ON DELETE CASCADE
)
TABLESPACE pg_default;

ALTER TABLE public.barrio_session
    OWNER to $USER;