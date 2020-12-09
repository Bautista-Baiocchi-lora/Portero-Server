import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class AdminRegistrationDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
