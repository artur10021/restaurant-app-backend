import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "./users.model";
import {Burger} from "../menu/menu.model";


@Table({tableName:'user_burgers', createdAt: false, updatedAt: false})
export class UserBurgers extends Model<UserBurgers>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(()=> User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(()=> Burger)
    @Column({type: DataType.INTEGER})
    BurgerId: number
}