import { IsString } from 'class-validator';

export class Guest {
  @IsString()
  doc_id: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;
}
