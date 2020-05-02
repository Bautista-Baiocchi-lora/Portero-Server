import { Injectable } from '@nestjs/common';
import MessageService from 'src/message/message.service';
import { MessageType } from 'src/message/message.type';
import { JwtSession } from 'src/session/jwt.service';
import { Connection } from 'typeorm';
import * as query from './propietario.queries';
import { PropietarioRegistrationDTO } from './propietario.registration.dto';

@Injectable()
export default class PropietarioService {
  constructor(
    private readonly connection: Connection,
    private readonly messageService: MessageService,
  ) {}

  async getAllLotes(session: JwtSession): Promise<any[]> {
    return await this.connection.query(query.get_all_lotes_query(session.acc_id));
  }

  async register(registerDTO: PropietarioRegistrationDTO, session: JwtSession): Promise<boolean> {
    const message: any = await this.messageService.decode(registerDTO.message, registerDTO.id);

    if (message.type !== MessageType.ASSOCIATE_PROP) {
      throw new Error('Message must be of type: Associate_Prop');
    }

    return await this.connection
      .query(
        query.insert_propiertario_of_lote(
          message.lote_id,
          message.barrio_id,
          session.acc_id,
          session.dev_id,
          registerDTO.nickname,
        ),
      )
      .then(response => !!response);
  }
}
