import { Guest } from './guest.entity';
import { InviteCreationDTO } from './invite.creation.dto';

export const insert_guests_rejected = (guardia_id: string, dev_id: string, guests: string[]) => {
  var stringifiedGuests = guests.join("', '");
  return `SELECT * FROM insert_guests_rejected('${guardia_id}', '${dev_id}', ARRAY ['${stringifiedGuests}']::uuid[]);`;
};

export const insert_guests_entered = (guardia_id: string, dev_id: string, guests: string[]) => {
  var stringifiedGuests = guests.join("', '");
  return `SELECT * FROM insert_guests_entered('${guardia_id}', '${dev_id}', ARRAY ['${stringifiedGuests}']::uuid[]);`;
};

export const insert_guests_exited = (guardia_id: string, dev_id: string, guests: string[]) => {
  var stringifiedGuests = guests.join("', '");
  return `SELECT * FROM insert_guests_exited('${guardia_id}', '${dev_id}', ARRAY ['${stringifiedGuests}']::uuid[]);`;
};

export const get_invite_guest_list = invite_id => {
  return `SELECT * FROM get_invite_guest_list('${invite_id}');`;
};

export const select_invite_as_guardia = (session_id: string, invite_id: string) => {
  return `SELECT * FROM select_invite_as_guardia('${invite_id}', '${session_id}');`;
};

export const insert_invite = (
  acc_id: string,
  dev_id: string,
  inviteDTO: InviteCreationDTO,
  secsTillExp: number,
): string => {
  return `SELECT * FROM insert_invite('${acc_id}', '${dev_id}', ARRAY [${parseGuests(
    inviteDTO.guests,
  )}]::invited_guest[], '${inviteDTO.lote_id}', '${secsTillExp}');`;
};

const parseGuests = (guests: Guest[]) => {
  var stringifiedGuests = '';
  guests.forEach(guest => {
    stringifiedGuests += `('${guest.first_name}', '${guest.last_name}', '${guest.doc_id}'),`;
  });
  //remove trailing comma
  return stringifiedGuests.slice(0, -1);
};

export const select_invites_by_propietario = (acc_id: string, dev_id: string) => {
  return `SELECT * FROM select_invites_by_propietario('${acc_id}', '${dev_id}');`;
};
