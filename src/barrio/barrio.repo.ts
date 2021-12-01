import { create_account } from 'src/account/account.repo';
import BarrioRegistrationDTO from './barrio.register.dto';

export const create_barrio = async (
  client,
  dto: BarrioRegistrationDTO,
): Promise<boolean> => {
  try {
    await client.query('BEGIN');

    const acc_id = await create_account(client, dto.email, dto.password);

    await client.query(create_barrio_query(acc_id, dto.name));
    await client.query('COMMIT');
    return true;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

const create_barrio_query = (acc_id: string, name: string) => {
  return {
    text: 'INSERT INTO barrio (id, name) values ($1, $2)',
    values: [acc_id, name],
  };
};
