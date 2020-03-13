import { IsEmail, IsNotEmpty } from "class-validator";

export class BarrioLogInDTO{

    @IsEmail()
    email: string;
    
    password:string;
}