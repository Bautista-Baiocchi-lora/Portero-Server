
types = []

# ORDER IS IMPORTANT
tables = [
    './tables/account.sql',
    './tables/person_document.sql',
    './tables/person.sql',
    './tables/barrio.sql',
    './tables/session.sql'
    ]

functions = [
    './functions/import_uuid_generator.sql',
    './functions/insert_session.sql',
]

scripts = types + tables + functions

user = input("Psql Username?")

compiled_file  = open('compiled.sql', 'wt')

for script_uri in scripts:
    with open(script_uri, 'r') as script:
        compiled_file.write(script.read().replace('$USER', user)+'\n\n')


compiled_file.close()

"""
with open('drop_db.sql', 'wt') as drop_db_file:
    #Drop table triggers
    drop_db_file.write("--Drop table triggers\n")
    drop_db_file.write("drop trigger can_be_guardia on guardia;\n")
    drop_db_file.write("drop trigger is_user on user_session;\n")
    drop_db_file.write("drop trigger can_be_propietario on propietario;\n")
    drop_db_file.write("drop trigger is_propietario on invite;\n")
    drop_db_file.write("drop trigger can_guest_enter on guest_entered;\n")
    drop_db_file.write("drop trigger can_reject_guest on guest_rejected;\n")
    drop_db_file.write("drop trigger can_guest_exit on guest_exited;\n")

    #Drop tables
    drop_db_file.write("--Drop tables\n")
    drop_db_file.write("drop table account, barrio, barrio_session, device, guardia, message, lote, lote_in_barrio, person, user_session, propietario, session, guest, invite, guest_entered, guest_exited, guest_rejected cascade;\n")
    
    #Drop functions
    drop_db_file.write("--Drop functions\n")
    drop_db_file.write("drop function if exists get_account_type, select_propietarios_by_barrio, disable_guardia, disable_propietario, can_guest_exit, insert_guests_exited, insert_person, is_propietario, select_invites_by_propietario, select_barrio_user, select_person_user, can_reject_guest, insert_guests_entered, insert_guests_rejected, can_guest_enter, get_invite_guest_list, select_invite_as_guardia, can_be_guardia, is_user, can_be_propietario, delete_lote, insert_person, insert_barrio_session, insert_user_session, insert_barrio, insert_guardia, insert_invite, insert_lote, insert_message, insert_propietario, insert_message, insert_session, insert_user, select_account, select_guardias_by_barrio, select_lotes_by_barrio, select_lotes_by_propietario, verify_session;\n")

    #Drop types
    drop_db_file.write("--Drop types\n")
    drop_db_file.write("drop type if exists invited_guest;")
 """  
