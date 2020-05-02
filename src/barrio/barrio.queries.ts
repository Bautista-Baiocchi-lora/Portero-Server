import { BarrioRegistrationDTO } from './barrio.registration.dto';

export const select_all_lotes = (barrio_id: string): string => {
  return `SELECT * from select_lotes_by_barrio('${barrio_id}');`;
};

export const parse_insert_barrio_query = (response): boolean => {
  return !!response[0];
};

export const delete_barrio_query = (email: string): string => {
  return `DELETE from account WHERE email = '${email}';`;
};

export const insert_barrio_query = (registerDTO: BarrioRegistrationDTO): string => {
  const { email, password, name } = registerDTO;
  return `SELECT insert_barrio('${email}', '${password}', '${name}');`;
};
