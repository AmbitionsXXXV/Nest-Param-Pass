import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Controller装饰器使用后同样表示可以注入,从而nest会把该对象注入容器
// Controller 只需要被注入,所以 nest 单独给它加了 @Controller 的装饰器
@Controller()
export class AppController {
  // 声明了对 AppService 的依赖
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // 从而可以在 AppController 调用 AppService 的方法
    return this.appService.getHello();
  }
}
