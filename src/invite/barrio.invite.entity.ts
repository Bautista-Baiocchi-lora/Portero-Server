import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsUUID, IsDateString } from "class-validator";

@Entity()
export default class BarrioInvite{

    @PrimaryGeneratedColumn()
    @IsUUID()
    id: string;

    @Column()
    @IsUUID()
    barrio_id:string;

    @Column()
    @IsDateString()
    creation_date:string;

    @Column()
    @IsDateString()
    exp:number;
}