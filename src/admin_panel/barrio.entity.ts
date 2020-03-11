import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Barrio{

    @PrimaryGeneratedColumn()
    barrio_id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

}