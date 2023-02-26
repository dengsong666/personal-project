import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response } from './common/interceptors/response';
import { HttpFilter } from './common/interceptors/filter';
import { RoleGuard } from './common/guards/role.guard';
import * as cors from 'cors'; // 跨域中间件
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  app.use(cors());
  app.useGlobalFilters(new HttpFilter());
  app.useGlobalInterceptors(new Response());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new RoleGuard());

  await app.listen(3000);
}
bootstrap();
