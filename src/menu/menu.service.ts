import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Burger} from "./menu.model";
import {CreateBurgerDto} from "./dto/create-burger-dto";
import {FilesService} from "../files/files.service";

@Injectable()
export class MenuService {

    constructor(@InjectModel(Burger) private burgerRepository: typeof Burger,
                private fileService: FilesService)  {}

    async createBurger(dto: CreateBurgerDto, image: any){
        const fileName = await this.fileService.createFile(image);
        const burger = await this.burgerRepository.create({...dto, image: fileName}); //перезаписываем поле image поскольку там содержиться сам файл, а нам нужно его название
        return burger;
    }

    async getAllBurgers(){
        const burgers = await this.burgerRepository.findAll();
        return burgers;
    }

    async getBurgerByName(name: string){
        const burger = await this.burgerRepository.findOne({where:{name}})
        return burger;
    }
}
