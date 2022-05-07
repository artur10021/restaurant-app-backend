import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto{
    @ApiProperty({example:"administrator", description: 'role description'})
    readonly description:string;

    @ApiProperty({example:'ADMIN', description: 'user role'})
    readonly value:string;
}