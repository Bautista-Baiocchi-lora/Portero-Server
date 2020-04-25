 CREATE TABLE public.device
(
    id text PRIMARY KEY,
    type DEVICE_TYPE,
    creation_date timestamp without time zone default current_timestamp
)
TABLESPACE pg_default;

ALTER TABLE public.device
    OWNER to bautista;