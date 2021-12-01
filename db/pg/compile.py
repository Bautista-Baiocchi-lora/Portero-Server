import sys
types = []

# ORDER IS IMPORTANT

deps = [
    './functions/import_uuid_generator.sql',
    './tables/account.sql',
    './tables/person_document.sql',
    './tables/person.sql',
    './tables/barrio.sql',
    './tables/session.sql',
    './functions/insert_session.sql'
]

user = sys.argv[1]

compiled_file  = open('compiled.sql', 'wt')

for script_uri in deps:
    with open(script_uri, 'r') as script:
        compiled_file.write(script.read().replace('$USER', user)+'\n\n')


compiled_file.close()


with open('drop_db.sql', 'wt') as drop_db_file:
    #Drop table triggers
    drop_db_file.write("--Drop table triggers\n")
    drop_db_file.write("--drop trigger can_reject_guest on guest_rejected;\n")
    drop_db_file.write("--drop trigger can_guest_exit on guest_exited;\n")

    #Drop tables
    drop_db_file.write("--Drop tables\n")
    drop_db_file.write("drop table person, barrio, person_document, account, session cascade;\n")
    
    #Drop functions
    drop_db_file.write("--Drop functions\n")
    drop_db_file.write("drop function if exists insert_session;\n")

    #Drop types
    drop_db_file.write("--Drop types\n")
    drop_db_file.write("--drop type if exists invited_guest;")
 
