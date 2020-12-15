import { IsEmail, IsNotEmpty } from 'class-validator';

export default class LogInDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  //device Mac_Adress
  mid?: string;
}
