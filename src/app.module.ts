import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthenticationModule } from './module/authentication';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
