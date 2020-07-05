CREATE TABLE public.rejected_guest
(
    guest_id uuid PRIMARY KEY REFERENCES guest (id) ON DELETE RESTRICT,
    user_id uuid, 
    device_id text,
    entered timestamp without time zone default current_timestamp,
    exited timestamp without time zone default null,
    FOREIGN KEY (user_id, device_id) REFERENCES guardia(user_id, device_id) ON DELETE RESTRICT
)
TABLESPACE pg_default;

ALTER TABLE public.rejected_guest
    OWNER to $USER;