import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { Request } from "express";
import {AuthDto} from "./dto"

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}
    
    @Post('signin')
    public signin(@Body() dto: AuthDto){
        console.log(dto)
        return this.authService.signin(dto)
    }
    
    @Post('signup')
    public signup(@Body() dto: AuthDto){
        return this.authService.signup(dto)
    }
}