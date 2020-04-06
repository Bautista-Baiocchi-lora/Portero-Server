import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {IsEmail} from 'class-validator'

@Entity()
export default class Barrio{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    creation_date: string;

}
