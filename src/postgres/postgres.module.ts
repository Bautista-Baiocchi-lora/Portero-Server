import { Module } from '@nestjs/common';
const { Pool } = require('pg');

const connection = {
  provide: 'postgres',
  useFactory: () =>
    new Pool({
      user: 'bautista',
      host: 'localhost',
      database: 'server',
      port: 5432,
    }),
};

@Module({
  providers: [connection],
  exports: ['postgres'],
})
export default class PostgresModule {}
