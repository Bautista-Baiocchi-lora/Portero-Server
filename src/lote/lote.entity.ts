import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Lote{

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    barrio_id:string;

    @Column()
    name:string;

    @Column()
    num: number;

    @Column()
    code: number;

    @Column()
    street:string;

}