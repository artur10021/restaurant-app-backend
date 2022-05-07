import {Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {MenuService} from "./menu.service";
import {CreateBurgerDto} from "./dto/create-burger-dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {Roles} from "../auth/roles-auth.decorator";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles-guard";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Burger} from "./menu.model";

@ApiBearerAuth()
@ApiTags("menu API")
@Controller('menu')
export class MenuController {
    constructor(private menuService: MenuService) {}

    @ApiOperation({summary: 'add item to menu'})
    @ApiResponse({status:200, type: Burger})
    @ApiBody({type:CreateBurgerDto})
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("/addBurger")
    @UseInterceptors(FileInterceptor('image'))
    addToMenu(@Body() burgerDto: CreateBurgerDto,
              @UploadedFile() image:Express.Multer.File){
        console.log("-----------------",image)
        return this.menuService.createBurger(burgerDto, image);
    }

    @ApiOperation({summary: 'get all menu'})
    @ApiResponse({status:200, type: [Burger]})
    @Roles('USER')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAllMenu(){
        return this.menuService.getAllBurgers();
    }

    @ApiOperation({summary: 'get burger by name from menu'})
    @ApiResponse({status:200, type: [Burger]})
    @Roles('USER')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(":name")
    getBurgerByNameFromMenu(@Param("name") name: string){
        return this.menuService.getBurgerByName(name);
    }
}
