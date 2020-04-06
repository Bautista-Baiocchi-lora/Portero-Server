import { IsUUID, IsString, IsDateString, IsNumber, IsEmail } from "class-validator";
import { PrimaryColumn, PrimaryGeneratedColumn, Entity, Column } from "typeorm";

@Entity()
export default class Session{
 
    @PrimaryGeneratedColumn()
    @IsUUID()
    id: string;

    @Column()
    @IsString()
    acc_id: string;

    @IsNumber()
    type?:number;

    @IsEmail()
    email?:string;

    @Column()
    @IsDateString()
    creation_date:string;

    @Column()
    @IsDateString()
    exp:number;

} 
