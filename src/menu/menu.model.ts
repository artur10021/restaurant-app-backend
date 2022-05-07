import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {UserBurgers} from "../users/user-burgers.model";
import {ApiProperty} from "@nestjs/swagger";

interface BurgerCreationAttrs{
    name: string;
    price:number;
    ingredients: string;
    image: string;
}

@Table({tableName:'menu'})
export class Burger extends Model<Burger, BurgerCreationAttrs>{

    @ApiProperty({example:1, description: 'burger id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example:'cheeseburger', description: 'burger name'})
    @Column({type: DataType.STRING, unique: true, allowNull:false})
    name: string

    @ApiProperty({example:5, description: 'burger price'})
    @Column({type: DataType.INTEGER, allowNull:false})
    price: number;

    @ApiProperty({example:'bread, cheese', description: 'ingredients'})
    @Column({type: DataType.STRING, allowNull:true})
    ingredients: string;

    @ApiProperty({example:'example.jpg', description: 'image file'})
    @Column({type: DataType.STRING, allowNull:true})
    image: string;

    @ApiProperty({ description: 'users who have burgers'})
    @BelongsToMany(()=> User, ()=> UserBurgers)
    users: User[];
}