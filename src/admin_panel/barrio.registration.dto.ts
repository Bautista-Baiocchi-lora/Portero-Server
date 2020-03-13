import { IsEmail, IsDefined, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class BarrioRegistrationDTO{

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string;

}