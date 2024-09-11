import { Module, NestMiddleware } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBaseService } from './common/DataBaseService';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [AuthModule, UserModule, TaskModule],
  controllers: [AppController],
  providers: [AppService,DataBaseService],
})
export class AppModule {}
