import { IsUUID, IsString, IsDateString } from "class-validator";
import { PrimaryColumn, PrimaryGeneratedColumn, Entity, Column } from "typeorm";

@Entity()
export default class Session{
 
    @PrimaryGeneratedColumn()
    @IsUUID()
    session_id: string;

    @Column()
    @IsString()
    account_id: number;

    @Column()
    @IsDateString()
    creation_date:string;

    @Column()
    @IsDateString()
    exp:number;

} 
