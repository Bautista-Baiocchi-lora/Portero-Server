--Drop table triggers
/*
drop trigger can_be_guardia on guardia;
drop trigger is_user on user_session;
drop trigger can_be_propietario on propietario;
drop trigger is_propietario on invite;
drop trigger can_guest_enter on guest_entered;
drop trigger can_reject_guest on guest_rejected;
drop trigger can_guest_exit on guest_exited;
*/


--Drop tables
drop table person, barrio, person_document, account, session cascade;

--Drop functions
drop function if exists insert_session;

--Drop types
--drop type if exists invited_guest;