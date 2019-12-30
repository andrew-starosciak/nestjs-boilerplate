import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './users.service';

@Injectable()
export class AuthenticationService {

    constructor(
        private readonly _jwtService: JwtService,
        private readonly _usersService: UsersService,
    ) {
        // Empty
    }

    public async validateUser(username: string, pass: string): Promise<any> {
        const user = await this._usersService.findOne(username);

        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    public async login(user: any) {
        console.log(user);
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this._jwtService.sign(payload),
        };
    }
}
