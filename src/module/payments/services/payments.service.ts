import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { ConfigService } from '@nestjs/config';
import { Observable, from } from 'rxjs';

@Injectable()
export class PaymentsService {

    private _stripe: Stripe;

    constructor(
        private _configService: ConfigService,
    ) {
        this._stripe = new Stripe(
            this._configService.get('STRIPE_API_KEY'),
            {
                apiVersion: '2019-12-03',
                typescript: true,
            });
    }

    public handlePayment(amount: number, token: any): Observable<any> {
        // Create a charge.
        return from(this._stripe.charges.create({
            amount,
            currency: 'usd',
            description: 'Example Charge',
            source: token,
        }));
    }

}