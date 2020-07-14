--Drop table triggers
drop trigger can_be_guardia on guardia;
drop trigger is_user on user_session;
drop trigger can_be_propietario on propietario;
drop trigger is_propietario on invite;
drop trigger can_guest_enter on guest_entered;
drop trigger can_reject_guest on guest_rejected;
--Drop tables
drop table account, barrio, barrio_session, device, guardia, message, lote, lote_in_barrio, person, user_session, propietario, session, guest, invite, guest_entered, guest_exited, guest_rejected cascade;
--Drop functions
drop function if exists is_propietario, select_invites_by_propietario, select_barrio_user, select_person_user, can_reject_guest, insert_guests_entered, insert_guests_rejected, can_guest_enter, get_invite_guest_list, select_invite_as_guardia, can_be_guardia, is_user, can_be_propietario, delete_lote, insert_person, insert_barrio_session, insert_user_session, insert_barrio, insert_guardia, insert_invite, insert_lote, insert_message, insert_propietario, insert_message, insert_session, insert_user, select_account, select_guardias_by_barrio, select_lotes_by_barrio, select_lotes_by_propietario, verify_session;
--Drop types
drop type if exists invited_guest;