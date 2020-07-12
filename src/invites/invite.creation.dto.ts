import { IsArray, IsDateString, IsString } from 'class-validator';
import { Guest } from './guest.entity';

export class InviteCreationDTO {
  @IsArray()
  guests: Guest[];

  @IsDateString()
  exp: string;

  @IsString()
  lote_id: string;
}
