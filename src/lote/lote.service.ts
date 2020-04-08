import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateLoteDTO from './create.lote.dto';
import Lote from './lote.entity';

@Injectable()
export default class LoteService {
  constructor(@InjectRepository(Lote) private readonly loteRepo: Repository<Lote>) {}

  async create(barrio_id: string, loteDTO: CreateLoteDTO): Promise<boolean> {
    return await this.loteRepo
      .query(insert_lote_query(barrio_id, loteDTO))
      .then(parse_insert_query);
  }

  async associatePropietario(
    lote_id: string,
    barrio_id: string,
    propietario_id: string,
  ): Promise<boolean> {
    return await this.loteRepo
      .query(insert_propiertario_de_lote_query(lote_id, barrio_id, propietario_id))
      .then(parse_insert_query);
  }

  async getAll(barrio_id: string) {
    const lotes: any[] = await this.loteRepo.query(select_lotes_query(barrio_id));
    const lote_ids: string[] = lotes.map(lote => lote.lote_id);
    const propietariosOfLotes: any[] = await this.loteRepo.query(
      select_propietarios_of_lotes(lote_ids),
    );
    return lotes.map(lote => {
      return {
        ...lote,
        propietarios: propietariosOfLotes.filter(prop => prop.lote_id === lote.lote_id),
      };
    });
  }

  async delete(lote_id: string, barrio_id: string) {
    return await this.loteRepo.delete({ id: lote_id, barrio_id });
  }
}

function select_propietarios_of_lotes(lotes): string {
  return `SELECT * from select_propietarios_of_lotes(array${JSON.stringify(lotes)
    .split('"')
    .join("'")}::uuid[]);`;
}

function insert_propiertario_de_lote_query(
  lote_id: string,
  barrio_id: string,
  propietario_id: string,
): string {
  return `SELECT insert_propietario_of_lote('${barrio_id}', '${lote_id}', '${propietario_id}');`;
}

function parse_insert_query(response): boolean {
  return !!response[0];
}

function select_lotes_query(barrio_id: string): string {
  return `SELECT * from select_lotes('${barrio_id}');`;
}

function insert_lote_query(barrio_id: string, loteDTO: CreateLoteDTO): string {
  const { name, street, code, num } = loteDTO;

  return `SELECT insert_lote('${barrio_id}', '${name}', '${num}', '${street}', '${code}');`;
}
