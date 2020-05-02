export const insert_propiertario_of_lote = (
  lote_id: string,
  barrio_id: string,
  propietario_id: string,
  device_id: string,
  lote_nickname: string,
): string => {
  return `SELECT * from insert_propietario('${barrio_id}', '${lote_id}', '${propietario_id}', '${device_id}', '${lote_nickname}');`;
};

export const get_all_lotes_query = (acc_id: string) => `SELECT * from `;
