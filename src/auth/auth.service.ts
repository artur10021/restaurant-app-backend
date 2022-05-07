import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {User} from "../users/users.model";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user: User = await this.usersService.getUserByEmail(email);
        const passwordEquals = await bcrypt.compare(pass, user.password);
        if (user && passwordEquals) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = { email: user.email, sub: user.id, roles: user.roles };
        return {
            access_token: this.jwtService.sign(payload),
            roles: user.roles,
        };
    }

    async registration(req: User){
        const candidate = await this.usersService.getUserByEmail(req.email);
        if(candidate){
            throw new HttpException("Пользователь с таким email уже существует", HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(req.password, 5);
        const user = await this.usersService.createUser({...req, password: hashPassword});

        const payload = { email: user.email, sub: user.id, roles: user.roles };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

