import { IsNumber, IsString } from 'class-validator';

export default class CreateLoteDTO {
  @IsString()
  name: string;

  @IsNumber()
  num: number;

  @IsString()
  street: string;

  @IsNumber()
  code: number;
}
