import { IsString } from 'class-validator';

export class InviteCreationDTO {
  @IsString()
  doc_id: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  lote_id: string;
}
