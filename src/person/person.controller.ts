import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import e, { Express } from 'express';
import { diskStorage } from 'multer';

@Controller('api/person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  // form data 传参: 适合传输文件
  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
      storage: diskStorage({
        destination: 'uploads/',
        filename(
          req: e.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  body2(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return `received: ${JSON.stringify(createPersonDto)}`;
  }

  // form urlencoded 传参 / json 传参 都是从 body 取值,Nest 内部会根据 content type 做区分使用不同的解析方式
  @Post()
  body(@Body() createPersonDto: CreatePersonDto) {
    return `received: ${JSON.stringify(createPersonDto)}`;
  }

  // 因为 Nest 是自上往下匹配加载,同样 Get 请求所以要放前面,不然会匹配到 :id 的路由
  // query 请求
  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return `received: name = ${name}, age = ${age}`;
  }

  // urlParam 方式请求
  @Get(':id')
  urlParam(@Param('id') id: string) {
    return `received: id = ${id}`;
  }

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
