import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export default class Lote{

    @PrimaryColumn()
    barrio_id:string;

    @PrimaryColumn()
    name:string;

    @Column()
    num: number;

    @Column()
    code: number;

    @Column()
    street:string;

}