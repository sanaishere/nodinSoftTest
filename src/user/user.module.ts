import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DataBaseService } from 'src/common/DataBaseService';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[MulterModule.register({dest:'./files'})
  ,AuthModule
  ],
  controllers: [UserController],
  providers: [UserService,DataBaseService]
})
export class UserModule {}
