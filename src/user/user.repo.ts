import { create_account } from 'src/account/account.repo';
import { create_person, create_person_document } from './person.repo';
import UserRegistrationDTO from './user.register.dto';

export const create_user = async (
  client,
  dto: UserRegistrationDTO,
): Promise<boolean> => {
  try {
    await client.query('BEGIN');

    const acc_id = await create_account(client, dto.email, dto.password);
    const doc_id = await create_person_document(client, dto.doc_id);

    await create_person(client, acc_id, doc_id, dto);
    await client.query('COMMIT');
    return true;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};
