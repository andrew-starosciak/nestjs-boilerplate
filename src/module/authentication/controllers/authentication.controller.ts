import { Controller, Post, Req, Logger, UseGuards, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { BaseError } from '../../../models/index';

import { AuthenticationValidations } from '../validations/index';
import { AuthenticationService } from '../services/index';

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
        this._validate(email, password);

        return this._authenticationService.create(email, password);
    }

    @Post('auth/login')
    public async login(@Req() req: Request) {
        const { email, password } = req.body;
        this._validate(email, password);

        return this._authenticationService.login(email, password);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('protected/ping')
    public async protectedPing() {
        return ['Ping'];
    }

    // Ensure common validations on data before handling it.
    private _validate(email: string, password: string) {
        if (!email || !password) {
            throw new HttpException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: new BaseError('Please enter a valid email or password.', null, {email, password}),
            }, 403);
        }

        if (!AuthenticationValidations.ValidEmail(email)) {
            throw new HttpException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: new BaseError('This email is not a valid format.'),
            }, 400);
        }
    }
}
