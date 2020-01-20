import { Injectable, Inject } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Repository } from 'typeorm';

import { TIME } from '../../../common/index';

import { UserEntity } from '../../authentication/index';

import { EMAIL_HISTORY_TOKEN } from '../constants/index';
import { EmailHistoryEntity, EmailTypes, EmailProviderTypes } from '../entities/index';

import { GunmailEmailService } from './gunmail.service';

export interface IEmailResponse {
    userId: number;
    type: EmailTypes;
    provider: EmailProviderTypes;
    meta: string;
}

@Injectable()
export class EmailService {

    constructor(
        @Inject(EMAIL_HISTORY_TOKEN) private _emailHistoryRepository: Repository<EmailHistoryEntity>,
        private _emailProviderService: GunmailEmailService,
    ) {
        // Empty
    }

    public send(user: UserEntity, type: EmailTypes, meta?: any): Observable<any> {
        switch (type) {
            case EmailTypes.PASSWORDRESET:
                return this._passwordreset(user.id, user.email, meta);
        }
    }

    private _passwordreset(userId: number, email: string, meta?: any): Observable<IEmailResponse> {
        return this._emailProviderService.passwordreset(email).pipe(
            switchMap((body) => {
                return from(this._emailHistoryRepository.save({
                    userId,
                    type: EmailTypes.PASSWORDRESET,
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
