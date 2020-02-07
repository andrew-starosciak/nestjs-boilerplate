import { Controller, Post, Req, Logger, Request } from '@nestjs/common';

import { PaymentsService } from '../services/index';

@Controller()
export class PaymentsController {

    constructor(
        private _paymentsService: PaymentsService,
    ) {
        // Empty
    }

    @Post('payment/test')
    public login(@Req() req: Request) {
        return this._paymentsService.handlePayment(1, '');
    }
}
