import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DataBaseService } from 'src/common/DataBaseService';
import { JwtModule } from '@nestjs/jwt';

require('dotenv').config()
@Module({
  imports:[],
  providers: [AuthService,DataBaseService,
  ],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
