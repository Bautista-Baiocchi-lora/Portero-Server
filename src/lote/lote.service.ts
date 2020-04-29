import { Injectable } from '@nestjs/common';
import InviteService from 'src/invite/invite.service';
import { InviteType } from 'src/invite/invite.type';
import { JwtSession } from 'src/session/jwt.service';
import { Connection } from 'typeorm';
import { AssociatePropietarioDTO } from './associate.propietario.dto';
import CreateLoteDTO from './create.lote.dto';
import * as query from './lote.queries';

@Injectable()
export default class LoteService {
  constructor(
    private readonly loteRepo: Connection,
    private readonly inviteService: InviteService,
  ) {}

  async create(barrio_id: string, loteDTO: CreateLoteDTO): Promise<Lote> {
    return await this.loteRepo
      .query(query.insert_lote_query(barrio_id, loteDTO))
      .then(response => response[0]);
  }

  async associatePropietario(
    associateDTO: AssociatePropietarioDTO,
    session: JwtSession,
  ): Promise<boolean> {
    const invite: any = await this.inviteService.decode(associateDTO.invite, associateDTO.id);

    if (invite.type !== InviteType.ASSOCIATE_PROP) {
      throw new Error('Invite must be of type: Associate_Prop');
    }

    return await this.loteRepo
      .query(
        query.insert_propiertario_de_lote_query(
          invite.lote_id,
          invite.barrio_id,
          session.acc_id,
          session.dev_id,
          associateDTO.nickname,
        ),
      )
      .then(query.parse_insert_query);
  }

  async getAllLotesOfPropietario(session: JwtSession): Promise<any[]> {
    return await this.loteRepo.query(
      query.select_lotes_by_propietario(session.acc_id, session.dev_id),
    );
  }

  async getAllLotesWithPropietariosByBarrio(barrio_id: string) {
    return await this.loteRepo.query(query.select_lotes_with_propietarios(barrio_id));
  }

  async delete(lote_id: string, barrio_id: string): Promise<string> {
    return await this.loteRepo.query(query.delete_lote_query(lote_id, barrio_id));
  }
}

export type Lote = {
  id: string;
  name: string;
  street: string;
  num: number;
  code: number;
};
