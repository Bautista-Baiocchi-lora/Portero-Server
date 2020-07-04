
types = []

# ORDER IS IMPORTANT
tables = [
    './tables/account.sql',
    './tables/person.sql',
    './tables/account_type.sql',
    './tables/message.sql',
    './tables/barrio.sql',
    './tables/lote.sql',
    './tables/lote_in_barrio.sql',
    './tables/device.sql',
    './tables/session.sql',
    './tables/barrio_session.sql',
    './tables/user_session.sql',
    './tables/guardia.sql',
    './tables/propietario.sql',
    './tables/guest.sql',
    './tables/invite.sql',
    './tables/visita.sql',
    ]

functions = [
    './functions/import_uuid_generator.sql',
    './functions/insert_barrio.sql',
    './functions/insert_user.sql',
    './functions/select_account.sql',
    './functions/insert_session.sql',
    './functions/verify_session.sql',
    './functions/insert_lote.sql',
    './functions/delete_lote.sql',
    './functions/insert_message.sql',
    './functions/insert_guardia.sql',
    './functions/insert_propietario.sql',
    './functions/select_lotes_by_barrio.sql',
    './functions/select_lotes_by_propietario.sql',
    './functions/update_account_type.sql',
    './functions/select_guardias_by_barrio.sql',
    './functions/insert_invite.sql',
    './functions/validate_invite.sql',
    './functions/allow_visita.sql',
]

scripts = types + tables + functions

user = input("Psql Username?")

compiled_file  = open('compiled.sql', 'wt')

for script_uri in scripts:
    with open(script_uri, 'r') as script:
        compiled_file.write(script.read().replace('$USER', user)+'\n\n')


compiled_file.close()

with open('drop_tables.sql', 'wt') as drop_tables_file:
    #Drop table triggers
    drop_tables_file.write("drop trigger can_be_guardia on guardia;\n")
    drop_tables_file.write("drop trigger revert_account_type_to_user on guardia;\n")
    drop_tables_file.write("drop trigger update_account_type_to_guardia on guardia;\n")
    drop_tables_file.write("drop trigger is_user on user_session;\n")
    drop_tables_file.write("drop trigger can_be_propietario on propietario;\n")

    #Drop tables
    drop_tables_file.write("drop table account, barrio, account_type, barrio_session, device, guardia, message, lote, lote_in_barrio, person, user_session, propietario, session, guest, invite, visita cascade;")

with open('drop_functions.sql', 'wt') as drop_functions_file:
    drop_functions_file.write("drop function if exists can_be_guardia, is_user, can_be_propietario, revert_account_type_to_user, update_account_type_to_guardia, allow_visita, delete_lote, insert_person, insert_barrio_session, insert_user_session, insert_barrio, insert_guardia, insert_invite, insert_lote, insert_message, insert_propietario, insert_message, insert_session, insert_user, select_account, select_guardias_by_barrio, select_lotes_by_barrio, select_lotes_by_propietario, update_account_type, validate_invite, verify_session;")

