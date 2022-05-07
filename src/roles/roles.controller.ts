import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-user.dto";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "./roles.model";

@ApiBearerAuth()
@ApiTags("roles API")
@Controller('roles')
export class RolesController {

    constructor(private roleService: RolesService) {
    }

    @ApiOperation({summary: 'add role'})
    @ApiResponse({status:200, type: Role})
    @ApiBody({type:CreateRoleDto})
    @Post()
    create(@Body() dto: CreateRoleDto){
        return this.roleService.createRole(dto);
    }

    @ApiOperation({summary: 'get role by value'})
    @ApiResponse({status:200, type: Role})
    @Get(':value')
    getByValue(@Param('value')  value: string){
        return this.roleService.getRoleByValue(value);
    }
}
