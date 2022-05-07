import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example:'userEmail123', description: 'user email'})
    readonly email: string;

    @ApiProperty({example:'paSsw&ord123', description: 'user password'})
    readonly password: string
}