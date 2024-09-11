import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { DataBaseService } from 'src/common/DataBaseService';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[AuthModule,UserModule],
  controllers: [TaskController],
  providers: [TaskService,DataBaseService]
})
export class TaskModule {}
