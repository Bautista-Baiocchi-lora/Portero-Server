import UserRegistrationDTO from './user.register.dto';

export const create_person = async (
  pg,
  acc_id: string,
  doc_id: string,
  dto: UserRegistrationDTO,
) => {
  return pg
    .query(create_person_query(acc_id, dto, doc_id))
    .then((res) => !!res);
};

export const create_person_document = async (pg, doc_id) => {
  return pg
    .query(create_person_document_query(doc_id))
    .then((res) => res.rows[0].id);
};

const create_person_document_query = (doc_id: string) => {
  return {
    text: 'INSERT INTO person_document(doc_id) values ($1) returning id',
    values: [doc_id],
  };
};

const create_person_query = (
  acc_id: string,
  dto: UserRegistrationDTO,
  doc_id: string,
) => {
  return {
    text:
      'INSERT INTO person(id, first_name, last_name, birth_date, doc_id) values ($1, $2, $3, $4, $5)',
    values: [acc_id, dto.first_name, dto.last_name, dto.birth_date, doc_id],
  };
};
