import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DatabaseModule } from '../database/index';

import { PaymentsController } from './controllers/index';

@Module({
    imports: [
        ConfigModule,
        DatabaseModule,
    ],
    controllers: [
        PaymentsController,
    ],
    providers: [
        ConfigService,
    ],
})
export class PaymentsModule {}
