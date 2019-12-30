import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/index';'

@Injectable()
export class AuthService {

    constructor(
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
}
