import { IsEmail, IsMACAddress, IsNotEmpty } from 'class-validator';

export class LogInDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  //device Mac_Adress
  @IsMACAddress()
  mid?: string;
}
