import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class Account {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsDateString()
  @IsNotEmpty()
  creation_date: Date;
}
