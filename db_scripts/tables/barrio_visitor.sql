CREATE TABLE public.barrio_visitor
(
    invite_id uuid PRIMARY KEY REFERENCES invite (id) ON DELETE CASCADE,
    in_time timestamp without time zone default current_timestamp,
    out_time timestamp without time zone default null,
    device_id text,
    guard_id uuid,
    FOREIGN KEY (guard_id, device_id) REFERENCES guardia(user_id, device_id) 

)
TABLESPACE pg_default;

ALTER TABLE public.barrio_visitor
    OWNER to $USER;