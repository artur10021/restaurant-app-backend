import { BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {UserRoles} from "./user-roles.model";
import {ApiProperty} from "@nestjs/swagger";

interface RoleCreationAttrs{
    value:string,
    description:string
}

@Table({tableName:'roles', createdAt:false, updatedAt:false})
export class Role extends Model<Role, RoleCreationAttrs>{

    @ApiProperty({example:1, description: 'role id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example:'ADMIN', description: 'user role'})
    @Column({type: DataType.STRING, unique: true, allowNull:false})
    value: string

    @ApiProperty({example:"administrator", description: 'role description'})
    @Column({type: DataType.STRING, allowNull:false})
    description: string

    @ApiProperty({description: 'users who have role'})
    @BelongsToMany(()=>User, ()=> UserRoles)
    users:User[];

}