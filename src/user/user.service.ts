import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import UserRegistrationDTO from './user.registration.dto';

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export default class UserService {
  constructor(private readonly connection: Connection) {}

  async register(registerDTO: UserRegistrationDTO): Promise<boolean> {
    registerDTO.password = await bcrypt.hash(registerDTO.password, saltRounds);
    return await this.connection.query(insert_query(registerDTO)).then(response => !!response);
  }
}

const insert_query = (registerDTO: UserRegistrationDTO): string => {
  const { email, password, first_name, last_name, birth_date, doc_id } = registerDTO;
  return `SELECT * from insert_user('${email}', '${password}', '${first_name}', '${last_name}', '${birth_date}'::date, '${doc_id}');`;
};
