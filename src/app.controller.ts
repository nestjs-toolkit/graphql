import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class AppController {
  @Get()
  getHello(@Req() req: Request): string {
    return 'Hello World';
  }
}
