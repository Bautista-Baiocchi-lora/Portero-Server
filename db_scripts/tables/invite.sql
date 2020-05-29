CREATE TABLE public.invite
(
    message_id uuid REFERENCES message (id) ON DELETE CASCADE,
    guest_id uuid REFERENCES guest (id) ON DELETE CASCADE,
    PRIMARY KEY(message_id, guest_id)
)
TABLESPACE pg_default;

ALTER TABLE public.guest
    OWNER to $USER;