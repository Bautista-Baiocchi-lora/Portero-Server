import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class UserRegistrationDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsDateString()
  @IsNotEmpty()
  birth_date: Date;

  @IsString()
  @IsNotEmpty()
  doc_id: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
