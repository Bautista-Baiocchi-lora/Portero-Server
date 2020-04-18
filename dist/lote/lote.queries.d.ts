import CreateLoteDTO from './create.lote.dto';
export declare const select_lotes_by_propietario: (propietario_id: string, device_id: string) => string;
export declare const insert_propiertario_de_lote_query: (lote_id: string, barrio_id: string, propietario_id: string, device_id: string, lote_nickname: string) => string;
export declare const parse_insert_query: (response: any) => boolean;
export declare const delete_lote_query: (lote_id: string) => string;
export declare const select_lotes_with_propietarios: (barrio_id: string) => string;
export declare const insert_lote_query: (barrio_id: string, loteDTO: CreateLoteDTO) => string;
