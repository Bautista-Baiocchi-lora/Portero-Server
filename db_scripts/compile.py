
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
    './tables/trabajador.sql'
    ]

functions = [
    './functions/import_uuid_generator.sql',
    './functions/insert_account.sql',
    './functions/insert_barrio.sql',
    './functions/insert_user.sql',
    './functions/select_account.sql',
    './functions/insert_session.sql',
    './functions/verify_session.sql',
    './functions/insert_lote.sql',
    './functions/delete_lote.sql'
]

scripts = types + tables + functions

user = input("Psql Username?")

compiled_file  = open('compiled.sql', 'wt')

for script_uri in scripts:
    with open(script_uri, 'r') as script:
        compiled_file.write(script.read().replace('$USER', user)+'\n\n')


compiled_file.close()

with open('drop_tables.sql', 'wt') as drop_tables_file:
    drop_tables_file.write("drop table account, barrio, account_type, barrio_session, device, guardia, invite, lote, lote_in_barrio, person, phone_session, propietario, session, trabajador cascade;")

