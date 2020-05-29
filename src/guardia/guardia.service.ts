import { Injectable } from '@nestjs/common';
import MessageService from 'src/message/message.service';
import { JwtSession } from 'src/session/jwt.service';
import { Connection } from 'typeorm';
import { MessageType } from '../message/message.type';
import { GuardiaRegistrationDTO } from './guardia.registration.dto';

@Injectable()
export default class GuardiaService {
  constructor(
    private readonly connection: Connection,
    private readonly messageService: MessageService,
  ) {}

  async register(session: JwtSession, registerDTO: GuardiaRegistrationDTO): Promise<boolean> {
    const message: any = await this.messageService.decode(registerDTO.message, registerDTO.id);

    if (message.type !== MessageType.ASSOCIATE_GUARDIA) {
      throw new Error('Message must be of type: Associate_Guardia');
    }

    return await this.connection
      .query(insert_guardia(session.session_id, message.barrio_id, message.rank))
      .then(response => !!response);
  }
}

const insert_guardia = (session_id: string, barrio_id: string, guardia_rank: number): string =>
  `SELECT * from insert_guardia('${session_id}', '${barrio_id}', ${guardia_rank});`;
