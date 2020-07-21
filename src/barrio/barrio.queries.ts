import { BarrioRegistrationDTO } from './barrio.registration.dto';
import { DisableGuardiaDTO } from './disable.guardia.dto';
import { DisablePropietarioDTO } from './disable.propietario.dto';

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

export const disable_propietario = (barrio_id: string, dto: DisablePropietarioDTO) => {
  return `SELECT * FROM disable_propietario('${barrio_id}','${dto.prop_id}', '${dto.prop_dev_id}', '${dto.prop_lote_id}');`;
};

export const disable_guardia = (barrio_id: string, dto: DisableGuardiaDTO) => {
  return `SELECT * FROM disable_propietario('${barrio_id}','${dto.guardia_id}', '${dto.guardia_dev_id}');`;
};
