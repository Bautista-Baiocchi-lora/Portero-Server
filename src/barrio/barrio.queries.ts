import { BarrioRegistrationDTO } from './barrio.registration.dto';

export const select_all_lotes = (barrio_id: string): string => {
  return `SELECT * from select_lotes_by_barrio('${barrio_id}');`;
};

export const delete_barrio = (email: string): string => {
  return `DELETE from account WHERE email = '${email}';`;
};

export const insert_barrio = (registerDTO: BarrioRegistrationDTO): string => {
  const { email, password, name } = registerDTO;
  return `SELECT insert_barrio('${email}', '${password}', '${name}');`;
};

export const select_guardias_by_barrio = (session_id: string) => {
  return `SELECT * from select_guardias_by_barrio('${session_id}');`;
};

export const select_propietarios_by_barrio = (session_id: string) => {
    return `SELECT * from select_propietarios_by_barrio('${session_id}');`;
}
