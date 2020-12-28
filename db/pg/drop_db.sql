--Drop table triggers
--drop trigger can_reject_guest on guest_rejected;
--drop trigger can_guest_exit on guest_exited;
--Drop tables
drop table person, barrio, person_document, account, session cascade;
--Drop functions
drop function if exists insert_session;
--Drop types
--drop type if exists invited_guest;