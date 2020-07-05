import { InviteCreationDTO } from './invite.creation.dto';

export const insert_guests_rejected = (guardia_id: string, dev_id: string, guests: string[]) => {
  var stringifiedGuests = guests.join("', '");
  return `SELECT * FROM insert_guests_rejected('${guardia_id}', '${dev_id}', ARRAY ['${stringifiedGuests}']::uuid[]);`;
};

export const insert_guests_entered = (guardia_id: string, dev_id: string, guests: string[]) => {
  var stringifiedGuests = guests.join("', '");
  return `SELECT * FROM insert_guests_entered('${guardia_id}', '${dev_id}', ARRAY ['${stringifiedGuests}']::uuid[]);`;
};

export const get_invite_guest_list_as_guardia = (session_id: string, invite_id: string) => {
  return `SELECT * FROM get_invite_guest_list('${invite_id}');`;
};

export const select_invite_as_guardia = (session_id: string, invite_id: string) => {
  return `SELECT * FROM select_invite_as_guardia('${invite_id}', '${session_id}');`;
};

export function insert_invite(
  acc_id: string,
  dev_id: string,
  inviteDTO: InviteCreationDTO,
  secsTillExp: number,
): string {
  return `SELECT * FROM insert_invite('${acc_id}', '${dev_id}', '${inviteDTO.doc_id}', '${inviteDTO.first_name}', '${inviteDTO.last_name}', '${inviteDTO.lote_id}', '${secsTillExp}');`;
}
