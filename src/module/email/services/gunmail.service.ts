import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Mailgun from 'mailgun-js';
import { from, Observable } from 'rxjs';

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

    public send(): Observable<Mailgun.messages.SendResponse | Mailgun.Error> {
        const data = {
            from: 'test <andrew@' + this._configService.get<string>('EMAIL_MAILGUN_DOMAIN') + '>',
            to: 'andrewstarosciak@gmail.com',
            subject: 'Hello',
            text: 'Testing some Mailgun awesomeness!',
          };
        return from(this.client.messages().send(data));
    }
}
