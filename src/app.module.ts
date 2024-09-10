import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBaseService } from './common/DataBaseService';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,DataBaseService],
})
export class AppModule {}
