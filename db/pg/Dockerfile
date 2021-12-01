FROM postgres

COPY /compiled.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_PASSWORD marisa123
ENV POSTGRES_USER bautista
ENV POSTGRES_DB server
ENV PGDATA /pg-data
