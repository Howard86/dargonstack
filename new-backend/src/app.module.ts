import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { AccountModule } from './account/account.module';
import { GenerationModule } from './generation/generation.module';
import { DragonModule } from './dragon/dragon.module';
import { TaskModule } from './task/task.module';

require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot(new ConfigService(process.env).getTypeOrmConfig()),
    ScheduleModule.forRoot(),
    AccountModule,
    GenerationModule,
    DragonModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}