import { Controller, Post, Body, Query, UseGuards } from "@nestjs/common";
import { SessionGuard } from "src/session/session.guard";
import { IsUUID } from "class-validator";

@Controller('invite')
export default class InviteController{

    constructor(){}

    @Post('accept')
    @UseGuards(SessionGuard)
    async accept(@Query('id') invite_id){
        return invite_id
    }

}