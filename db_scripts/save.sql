
//select user by email

select a.*, p.*, a_type.type
from
(account a inner join account_type a_type on a.id = a_type.id)
inner join
person p on p.id = a.id
where a.email = email;

//select existing session by account_id and device_id
select s.*
from
session s inner join phone_session ps on s.id = ps.id
where ps.account_id = account_id and ps.device_id = device_id

//select prop by session_id
((phone_session ps inner join phone p
on ps.account_id = p.account_id and ps.device_id = p.device_id)
inner join 
propietario prop on prop.device_id = p.device_id and prop.account_id on p.account_id)
inner join
lote l on l.id = prop.lote_id
where ps.id = session_id


