import { IsEmail, IsNotEmpty } from "class-validator";

export class BarrioLogInDTO{

    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    password:string;
}