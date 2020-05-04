import { IsString } from 'class-validator';

export class GuardiaRegistrationDTO {
  @IsString()
  id: string;

  @IsString()
  message: string;
}
