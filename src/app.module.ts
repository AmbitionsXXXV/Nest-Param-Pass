import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';

// 通过 @Module 声明模块,其中 controllers 是控制器,只能被注入
// providers 里可以被注入,也可以注入别的对象,比如这里的 AppService
@Module({
  imports: [PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
