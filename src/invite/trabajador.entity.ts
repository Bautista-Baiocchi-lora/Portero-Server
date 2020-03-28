

export class Trabajador{

    id:number;

    email:string;

    password:string;

    documentId:string;

    documentType:number;

    //one deviceidId per user.
    deviceId:string;

    creation_date:number;

}

//login in with email, pass, and device id. hash both pass and device id, put them in jwt