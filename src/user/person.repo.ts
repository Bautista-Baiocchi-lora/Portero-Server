import UserRegistrationDTO from './user.register.dto';

export const create_person = async (
  pg,
  acc_id: string,
  dto: UserRegistrationDTO,
) => {
  return pg.query(create_person_query(acc_id, dto)).then((res) => !!res);
};

const create_person_query = (acc_id: string, dto) => {
  return {
    text:
      'INSERT INTO person(id, first_name, last_name, birth_date, doc_id) values ($1, $2, $3, $4, $5)',
    values: [acc_id, dto.first_name, dto.last_name, dto.birth_date, dto.doc_id],
  };
};
