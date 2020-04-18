"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.select_lotes_by_propietario = (propietario_id, device_id) => {
    return `SELECT * from select_lotes_by_propietario('${propietario_id}', '${device_id}');`;
};
exports.insert_propiertario_de_lote_query = (lote_id, barrio_id, propietario_id, device_id, lote_nickname) => {
    return `SELECT insert_propietario_of_lote('${barrio_id}', '${lote_id}', '${propietario_id}', '${device_id}', '${lote_nickname}');`;
};
exports.parse_insert_query = (response) => {
    return !!response[0];
};
exports.delete_lote_query = (lote_id) => {
    return `SELECT * from delete_lote('${lote_id}');`;
};
exports.select_lotes_with_propietarios = (barrio_id) => {
    return `SELECT * from select_lotes_with_propietarios('${barrio_id}');`;
};
exports.insert_lote_query = (barrio_id, loteDTO) => {
    const { name, street, code, num } = loteDTO;
    return `SELECT * from insert_lote('${barrio_id}', '${name}', '${num}', '${street}', '${code}');`;
};
//# sourceMappingURL=lote.queries.js.map