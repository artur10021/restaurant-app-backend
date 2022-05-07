import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import { MenuModule } from './menu/menu.module';
import {ConfigModule} from "@nestjs/config";
import { UsersModule } from './users/users.module';
import {User} from "./users/users.model";
import {Burger} from "./menu/menu.model";
import {UserBurgers} from "./users/user-burgers.model";
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";

@Module({
  controllers: [],
  providers: [],
  imports: [

      ConfigModule.forRoot({
        envFilePath: 'server.env'
      }),
    ServeStaticModule.forRoot({//для раздачи статики
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User,Role, Burger, UserBurgers, UserRoles],
      autoLoadModels: true,
    }),
    MenuModule,
    UsersModule,
    AuthModule,
    RolesModule,
    FilesModule,
  ],
})
export class AppModule {}
