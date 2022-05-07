import {Controller, Post, UseGuards, Request} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./local-auth.guard";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user-dto";

@ApiTags("authorization API")
@Controller('auth')
export class AuthController {

    constructor( private authService: AuthService) {}

    @ApiOperation({summary: 'login user'})
    @ApiResponse({status:200, description:"return token, role"})
    @ApiBody({type:CreateUserDto})
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req:any) {
        return this.authService.login(req.user.dataValues);
    }

    @ApiOperation({summary: 'registration user'})
    @ApiResponse({status:200, description:"return token, role"})
    @ApiBody({type:CreateUserDto})
    @Post('/registration')
    registration(@Request() req: any){
        return this.authService.registration(req.body);
    }
}
