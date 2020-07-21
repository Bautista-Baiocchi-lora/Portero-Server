import { IsNotEmpty, IsString } from 'class-validator';

export class DisablePropietarioDTO {
  @IsNotEmpty()
  @IsString()
  prop_id: string;

  @IsNotEmpty()
  @IsString()
  prop_dev_id: string;

  @IsNotEmpty()
  @IsString()
  prop_lote_id: string;
}
