import { IsDateString, IsNumber, IsUUID } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class BarrioInvite {
  @PrimaryGeneratedColumn()
  @IsUUID()
  id: string;

  @Column()
  @IsUUID()
  barrio_id: string;

  @Column()
  @IsNumber()
  account_id: number;

  @Column()
  @IsDateString()
  creation_date: string;

  @Column()
  @IsDateString()
  exp: number;
}
