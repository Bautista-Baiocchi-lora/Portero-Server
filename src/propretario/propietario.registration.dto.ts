import { IsString } from 'class-validator';

export class PropietarioRegistrationDTO {
  @IsString()
  id: string;

  @IsString()
  message: string;

  @IsString()
  nickname: string;
}
