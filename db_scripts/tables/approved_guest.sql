CREATE TABLE public.approved_guest
(
    guest_id uuid PRIMARY KEY REFERENCES guest (id) ON DELETE RESTRICT,
    user_id uuid, 
    device_id text,
    created_date timestamp without time zone default current_timestamp,
    FOREIGN KEY (user_id, device_id) REFERENCES guardia(user_id, device_id) ON DELETE RESTRICT
)
TABLESPACE pg_default;

ALTER TABLE public.approved_guest
    OWNER to $USER;