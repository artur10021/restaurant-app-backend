import {BelongsToMany, Column, DataType, HasOne, Model, Table} from "sequelize-typescript";
import {Burger} from "../menu/menu.model";
import {UserBurgers} from "./user-burgers.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {ApiProperty} from "@nestjs/swagger";

interface UserCreationAttrs{
    email:string,
    password:string
}

@Table({tableName:'users'})
export class User extends Model<User, UserCreationAttrs>{

    @ApiProperty({example:1, description: 'user id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 'iEmail', description: 'user login/email'})
    @Column({type: DataType.STRING, unique: true, allowNull:false})
    email: string

    @ApiProperty({example:'paSsw&ord123', description: 'user password'})
    @Column({type: DataType.STRING, allowNull:false})
    password: string;

    @ApiProperty({description: 'added to basket burgers'})
    @BelongsToMany(()=> Burger, ()=> UserBurgers)
    burger: Burger[];

    @ApiProperty({description: 'user roles'})
    @BelongsToMany(()=>Role, ()=> UserRoles)
    roles:Role[];

}