import { IsUUID, IsString, IsDateString } from "class-validator";
import { PrimaryColumn, PrimaryGeneratedColumn, Entity, Column } from "typeorm";
import Propietario from "src/propretario/propietario.entity";
import { Barrio } from "src/barrio/barrio.entity";

@Entity()
export default class Session{
 
    @PrimaryGeneratedColumn()
    @IsUUID()
    id: string;

    @Column()
    @IsString()
    account_id: number;

    @Column()
    @IsDateString()
    creation_date:string;

    @Column()
    @IsDateString()
    exp:number;

    account?: Barrio | Propietario;

} 
