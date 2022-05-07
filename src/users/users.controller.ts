import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user-dto";
import {AddRoleDto} from "./dto/add-role.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles-guard";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";

@ApiBearerAuth()
@ApiTags("user API")
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @ApiOperation({summary: 'creating user'})
    @ApiResponse({status:200, type: User})
    @ApiBody({type:CreateUserDto})
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.userService.createUser(userDto);
    }

    @ApiOperation({summary: 'delete user by email'})
    @ApiResponse({status:200, type: User})
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('/:email')
    deleteUser(@Param('email') email: string){
        return this.userService.deleteUserByEmail(email);
    }

    @ApiOperation({summary: 'find user by email'})
    @ApiResponse({status:200, type: User})
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/:email')
    getUser(@Param('email') email: string){
        return this.userService.getUserByEmail(email);
    }

    @ApiOperation({summary: 'get all users'})
    @ApiResponse({status:200, type: [User]})
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAll(){
        return this.userService.getAllUsers();
    }

    @ApiOperation({summary: 'add user role'})
    @ApiResponse({status:200, type: [Role]})
    @ApiBody({type:AddRoleDto})
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/addRole')
    addRole(@Body() dto: AddRoleDto){
        return this.userService.addRole(dto);
    }

}
