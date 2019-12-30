import { Controller, Post, Req } from '@nestjs/common';

import { AuthenticationService } from '../services/index';
import { Request } from 'express';

@Controller()
export class AuthenticationController {

    constructor(
        private readonly _authenticationService: AuthenticationService,
    ) {
        // Empty
    }

    @Post('auth/login')
    public async login(@Req() req: Request) {
        console.log(req.body);
        console.log(JSON.parse(req.body));
        return this._authenticationService.login(req.user);
    }
}
