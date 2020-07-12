import { IsDateString, IsEnum, IsMACAddress, IsString, IsUUID } from 'class-validator';
import { AccountType } from 'src/authentication/account.type';

export default class Session {
  @IsUUID()
  session_id: string;

  @IsString()
  acc_id: string;

  @IsEnum(AccountType)
  acc_type: AccountType;

  @IsMACAddress()
  dev_id?: string;

  @IsDateString()
  creation_date: string;

  @IsDateString()
  exp: number;
}
