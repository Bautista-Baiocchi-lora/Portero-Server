import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import CreateLoteDTO from './create.lote.dto';
import * as query from './lote.queries';

@Injectable()
export default class LoteService {
  constructor(private readonly connection: Connection) {}

  async create(barrio_id: string, loteDTO: CreateLoteDTO): Promise<Lote> {
    return await this.connection
      .query(query.insert_lote_query(barrio_id, loteDTO))
      .then(response => response[0]);
  }

  async delete(lote_id: string, barrio_id: string): Promise<string> {
    return await this.connection.query(query.delete_lote_query(lote_id, barrio_id));
  }
}

export type Lote = {
  id: string;
  name: string;
  street: string;
  num: number;
  code: number;
};
