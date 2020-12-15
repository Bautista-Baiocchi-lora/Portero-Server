import Account from './account.entity';

export const select = async (pg, email): Promise<Account> => {
  return pg.query(select_account_query(email));
};

export const create_account = async (
  pg,
  email: string,
  password: string,
): Promise<string> => {
  return pg
    .query(create_account_query(email, password))
    .then((res) => res.rows[0].id);
};

const select_account_query = (email: string) => {
  return {
    text: 'SELECT a.* from account a  where a.email = $1',
    values: [email],
  };
};

const create_account_query = (email: string, password: string) => {
  return {
    text: 'INSERT INTO account(email, password) values ($1, $2) returning id',
    values: [email, password],
  };
};
