import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {ROLES_KEY} from "./roles-auth.decorator";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor( private jwtService: JwtService,
                 private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        const bearer = authHeader.split(" ")[0];
        const token = authHeader.split(" ")[1];

        if(bearer !== 'Bearer' || !token){
            throw new UnauthorizedException({massage:"Пользователь не авторизован"})
        }

        const user = this.jwtService.verify(token);
        req.user = user;
        return user.roles.some((role) => requiredRoles?.includes(role.value));
    }
}