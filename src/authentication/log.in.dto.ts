import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { DeviceType } from './device.type';

export class LogInDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  //device Mac_Adress
  @IsNotEmpty()
  mid: string;

  @IsEnum(DeviceType)
  type: DeviceType;
}
