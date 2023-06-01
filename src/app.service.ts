import { Injectable } from '@nestjs/common';

// 使用后表示可以注入,从而nest会把该对象注入容器
// 因为 Service 是可以被注入也是可以注入到别的对象的,所以用 @Injectable 声明
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
