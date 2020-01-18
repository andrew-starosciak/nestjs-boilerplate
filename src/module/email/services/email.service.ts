import { Injectable, Inject } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Repository } from 'typeorm';

import { TIME } from '../../../common/index';

import { EMAIL_HISTORY_TOKEN } from '../constants/index';
import { EmailHistoryEntity, EmailTypes } from '../entities/index';

import { GunmailEmailService } from './gunmail.service';

@Injectable()
export class EmailService {

    constructor(
        @Inject(EMAIL_HISTORY_TOKEN) private _emailHistoryRepository: Repository<EmailHistoryEntity>,
        private _gunMailService: GunmailEmailService,
    ) {
        // Empty
    }

    public send(userId: number, type: EmailTypes, meta?: any): Observable<any> {
        return this._gunMailService.send().pipe(
            switchMap((body) => {
                return from(this._emailHistoryRepository.save({
                    userId,
                    type,
                    provider: body.provider,
                    meta: JSON.stringify({
                        client: body.data,
                        meta: { ...meta },
                    }),
                    ...TIME.timestamps(),
                }));
            }),
        );
    }
}
