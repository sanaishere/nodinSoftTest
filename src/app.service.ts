import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataBaseService } from './common/DataBaseService';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
