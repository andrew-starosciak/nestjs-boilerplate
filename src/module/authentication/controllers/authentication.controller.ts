import { Controller, Post, Req, Logger, UseGuards, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthenticationService } from '../services/index';
import { BaseError } from 'src/models';

@Controller()
export class AuthenticationController {

    constructor(
        private readonly _authenticationService: AuthenticationService,
    ) {
        // Empty
    }

    @Post('auth/create')
    public create(@Req() req: Request) {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new HttpException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: new BaseError('Please enter a valid email or password.', null, {email, password}),
            }, 403);
        }

        return this._authenticationService.create(email, password);
    }

    @Post('auth/login')
    public async login(@Req() req: Request) {
        const { email, password } = req.body;

        return this._authenticationService.login(email, password);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('protected/ping')
    public async protectedPing() {
        return ['Ping'];
    }
}
