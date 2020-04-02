import { IsEmail, IsString, IsNotEmpty, IsNumber } from "class-validator";


export default class PropietarioRegistrationDTO{

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    doc_id: string;

    @IsNumber()
    doc_type: number;

    @IsString()
    @IsNotEmpty()
    password: string;

}