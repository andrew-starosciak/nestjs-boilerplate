import { Controller, Post, Req, Logger, Request } from '@nestjs/common';
import { Stripe } from 'stripe';

@Controller()
export class PaymentsController {

    constructor(
    ) {
        // Empty
    }

    @Post('payment/test')
    public login(@Req() req: Request) {
        // TODO
    }
}
