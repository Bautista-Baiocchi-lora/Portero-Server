CREATE TABLE public.invite
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    guest_id uuid REFERENCES guest (id) ON DELETE RESTRICT,
    device_id text ,
    user_id uuid,
    lote_id uuid,
    creation_date timestamp without time zone default current_timestamp,
    FOREIGN KEY (user_id, lote_id, device_id) REFERENCES propietario(user_id, lote_id, device_id)
)
TABLESPACE pg_default;

ALTER TABLE public.guest
    OWNER to $USER;