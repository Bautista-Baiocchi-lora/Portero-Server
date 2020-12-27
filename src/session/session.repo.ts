import { Session } from './session.entity';

export const create_session = async (
  pg,
  acc_id: string,
  exp,
): Promise<Session> => {
  return pg.query(create_session_query(acc_id, exp)).then((res) => res.rows[0]);
};

const create_session_query = (acc_id: string, exp) => {
  return {
    text: 'SELECT * from insert_session($1, $2)',
    values: [acc_id, exp],
  };
};
