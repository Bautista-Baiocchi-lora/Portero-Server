import { IsString } from 'class-validator';

export class AssociatePropietarioDTO {
  @IsString()
  id: string;

  @IsString()
  invite: string;

  @IsString()
  nickname: string;
}
