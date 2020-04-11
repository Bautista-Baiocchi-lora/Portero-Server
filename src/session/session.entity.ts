import { IsDateString, IsEmail, IsMACAddress, IsString, IsUUID } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Session {
  @PrimaryGeneratedColumn()
  @IsUUID()
  session_id: string;

  @Column()
  @IsString()
  acc_id: string;

  @Column()
  @IsMACAddress()
  device_id: string;

  @IsEmail()
  email?: string;

  @Column()
  @IsDateString()
  creation_date: string;

  @Column()
  @IsDateString()
  exp: number;
}
