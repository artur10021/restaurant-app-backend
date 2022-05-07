import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {LocalStrategy} from "./local.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard],
  imports:[
      forwardRef(()=>UsersModule),
      PassportModule
      ,
      JwtModule.registerAsync({
          imports:[ConfigModule],
          useFactory:(configService: ConfigService) =>({
              secret: configService.get<string>('PRIVATE_KEY'),
              signOptions:{
                  expiresIn: '8h'
              }
          }),
          inject:[ConfigService]
      })
  ],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
