import { Controller, Get } from '@nestjs/common';
import { AppService } from '@src/app.service';
import { MyLibraryService } from '@monorepo/my-library';
import { PinoLogger } from 'nestjs-pino';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(AppController.name);
  }

  @Get()
  getHello(): string {
    const lib = new MyLibraryService();
    return lib.hello();
  }
}
