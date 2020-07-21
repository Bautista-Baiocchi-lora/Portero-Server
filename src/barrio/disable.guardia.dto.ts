import { IsNotEmpty, IsString } from 'class-validator';

export class DisableGuardiaDTO {
  @IsNotEmpty()
  @IsString()
  guardia_id: string;

  @IsNotEmpty()
  @IsString()
  guardia_dev_id: string;
}
