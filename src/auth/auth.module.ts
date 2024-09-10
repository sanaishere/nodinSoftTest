import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DataBaseService } from 'src/common/DataBaseService';
import { JwtModule } from '@nestjs/jwt';

require('dotenv').config()
@Module({
  imports:[JwtModule.register({
    secret:process.env.JWT_SECRET,
    signOptions:{
      expiresIn:'2h'
    }

  }),],
  providers: [AuthService,DataBaseService,
  ],
  controllers: [AuthController]
})
export class AuthModule {}
