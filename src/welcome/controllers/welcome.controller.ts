import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class WelcomeController {
  @Get()
  async hello() {
    return { message: 'Hello World!' };
  }
}
