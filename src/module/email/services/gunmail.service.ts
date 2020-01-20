import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Mailgun from 'mailgun-js';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { EmailProviderTypes } from '../entities/index';

export interface EmailProviderResponse<T> {
    data: T;
    provider: any;
}

/**
 * Mailgun: https://www.npmjs.com/package/mailgun-js
 * 
 * @todo: Handle errors recieved from the mailgun api.
 */
@Injectable()
export class GunmailEmailService {

    public client: Mailgun.Mailgun;

    constructor(
        private _configService: ConfigService,
    ) {
        this.init();
    }

    private init(): void {
        // Setup the API and Connection to Mail Gun.
        this.client = Mailgun({
            apiKey: this._configService.get<string>('EMAIL_MAILGUN_API_KEY'),
            domain: this._configService.get<string>('EMAIL_MAILGUN_DOMAIN'),
        });
    }

    // Test cases.
    public test(): Observable<EmailProviderResponse<Mailgun.messages.SendResponse>> {
        const data = {
            from: 'test <andrew@' + this._configService.get<string>('EMAIL_MAILGUN_DOMAIN') + '>',
            to: 'andrewstarosciak@gmail.com',
            subject: 'Hello',
            text: 'Testing some Mailgun awesomeness!',
          };
        return from(this.client.messages().send(data)).pipe(
            switchMap((clientResponse) => {
                return of({
                    data: clientResponse,
                    provider: EmailProviderTypes.GUNMAIL,
                });
            }),
        );
    }

    // Password Reset Emailing.
    public passwordreset(email: string): Observable<EmailProviderResponse<any>> {
        // TODO: Use a template or something better.
        const data = {
            from: 'test <andrew@' + this._configService.get<string>('EMAIL_MAILGUN_DOMAIN') + '>',
            to: email,
            subject: 'Password Reset',
            text: 'Testing password reset',
          };

        return from(this.client.messages().send(data)).pipe(
            switchMap((clientResponse) => {
                return of({
                    data: clientResponse,
                    provider: EmailProviderTypes.GUNMAIL,
                });
            }),
        );
    }
}
