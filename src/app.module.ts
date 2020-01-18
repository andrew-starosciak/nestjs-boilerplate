import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthenticationModule } from './module/authentication';
import { EmailModule } from './module/email/index';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot(),
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
