import { Controller, Post, Req, Logger, UseGuards, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';

import { EmailService } from '../services/index';
import { EmailTypes } from '../entities';

@Controller()
export class EmailController {

    constructor(
        private readonly _emailService: EmailService,
    ) {
        // Empty
    }

    @Post('email/test')
    public test(@Req() req: Request) {
        return this._emailService.send(1, EmailTypes.TEST, {other: 'hello'});
    }
}
