import {forwardRef, Module} from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Burger} from "./menu.model";
import {User} from "../users/users.model";
import {UserBurgers} from "../users/user-burgers.model";
import {FilesModule} from "../files/files.module";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [MenuController],
  providers: [MenuService],
  imports:[
    SequelizeModule.forFeature([Burger, User, UserBurgers]),
      FilesModule,
    RolesModule,
    forwardRef(()=>AuthModule)
  ]
})
export class MenuModule {}
