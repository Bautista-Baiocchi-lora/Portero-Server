import CreateLoteDTO from './create.lote.dto';

export const select_lotes_by_propietario = (propietario_id: string, device_id: string): string => {
  return `SELECT * from select_lotes_by_propietario('${propietario_id}', '${device_id}');`;
};

export const parse_insert_query = (response): boolean => {
  return !!response[0];
};

export const delete_lote_query = (lote_id: string, barrio_id: string): string => {
  return `SELECT * from delete_lote('${lote_id}', '${barrio_id}');`;
};

export const insert_lote_query = (barrio_id: string, loteDTO: CreateLoteDTO): string => {
  const { name, street, code, num } = loteDTO;

  return `SELECT * from insert_lote('${barrio_id}', '${name}', '${num}', '${street}', '${code}');`;
};
