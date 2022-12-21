import { Injectable } from '@nestjs/common';
import { MyLibraryService } from '@monorepo/my-library';

@Injectable()
export class AppService {
  getHello(): string {
    const lib = new MyLibraryService();
    return lib.hello();
  }
}
