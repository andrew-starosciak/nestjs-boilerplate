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
    public login(@Req() req: Request) {
        const { email, password } = req.body;
        this._validate(email, password);

        return this._authenticationService.login(email, password);
    }

    @Post('auth/password-reset')
    public reset(@Req() req: Request<any>) {
        const { email } = req.body;

        if (!email) {
            throw new HttpException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: new BaseError('Please enter a email address.'),
            }, 422);
        }

        return this._authenticationService.reset(email);
    }

    // TODO: Implement.
    @Post('auth/password-code')
    public changePassword(@Req() req: Request<any>) {
        const { email, password, code } = req.body;

        if (!email || !password || !code) {
            throw new HttpException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: new BaseError('Please provide valid details to reset.'),
            }, 422);
        }

        return this._authenticationService.resetCode(email, password, code);
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
            }, 422);
        }

        if (!AuthenticationValidations.ValidEmail(email)) {
            throw new HttpException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: new BaseError('This email is not a valid format.'),
            }, 422);
        }
    }
}
