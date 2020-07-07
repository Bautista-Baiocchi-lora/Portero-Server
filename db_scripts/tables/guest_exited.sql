CREATE TABLE public.guest_exited
(
    guest_id uuid PRIMARY KEY REFERENCES guest (id) ON DELETE RESTRICT,
    guardia_id uuid, 
    device_id text,
    exited timestamp without time zone default current_timestamp,
    FOREIGN KEY (guardia_id, device_id) REFERENCES guardia(user_id, device_id) ON DELETE RESTRICT
)
TABLESPACE pg_default;

ALTER TABLE public.guest_exited
    OWNER to $USER;