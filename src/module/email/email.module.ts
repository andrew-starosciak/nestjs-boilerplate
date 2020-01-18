import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'typeorm';

import { DatabaseModule, DB_CONNECTION_TOKEN } from '../database/index';

import { EMAIL_HISTORY_TOKEN } from './constants/index';
import { EmailController } from './controllers/index';
import { EmailHistoryEntity } from './entities/index';
import { EmailService, GunmailEmailService } from './services/index';

export const providers = [{
    provide: EMAIL_HISTORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(EmailHistoryEntity),
    inject: [DB_CONNECTION_TOKEN],
}];

@Module({
    imports: [
        ConfigModule,
        DatabaseModule,
    ],
    controllers: [
        EmailController,
    ],
    providers: [
        {
            provide: EmailService,
            useClass: EmailService,
            inject: [GunmailEmailService],
        },
        {
            provide: GunmailEmailService,
            useClass: GunmailEmailService,
            inject: [ConfigService],
        },
        ConfigService,
        ...providers,
    ],
    exports: [
        EmailService,
    ],
})
export class EmailModule { }
