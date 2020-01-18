import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { GunmailEmailService } from './gunmail.service';

@Injectable()
export class EmailService {

    constructor(
        private _gunMailService: GunmailEmailService,
    ) {
        // Empty
    }

    public send(): Observable<any> {
        return this._gunMailService.send().pipe(
            tap((body) => {
                Logger.log(body);
                // Save the data to history email table.
            }),
        );
    }
}
