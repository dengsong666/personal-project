import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { Public, Roles } from 'src/common/decorator';
import { RolesGuard } from 'src/common/guard/role.guard';
import { Request } from 'express';
import { UserRole } from 'src/utils/enum';
import { plainToInstance } from 'class-transformer';
import { routes } from 'config/crud';

@Crud({
  model: { type: UserEntity },
  routes,
  query: {
    exclude: ['password'],
  },
})
@Controller('user')
@UseGuards(RolesGuard)
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) {}
  // 登录
  @Public()
  @Post('login')
  login(@Body() data: UserEntity): Promise<any> {
    return this.service.login(data);
  }
  // 注册
  @Public()
  @Post('register')
  register(@Body() data: UserEntity) {
    return this.service.register(plainToInstance(UserEntity, data));
  }
  // 获取个人信息
  @Get('profile')
  getProfile(@Req() request: Request) {
    return this.service.profile(plainToInstance(UserEntity, request.user));
  }
  // 修改个人信息
  @Patch('profile')
  setProfile(@Req() request: Request, @Body() data: UserEntity): Promise<any> {
    data.id = (request.user as any).id;
    return this.service.profile(plainToInstance(UserEntity, data), false);
  }
  // 修改个人密码
  @Patch('password')
  password(@Req() request: Request, @Body() data: UserEntity): Promise<any> {
    const { id, username } = request.user as any;
    data.id = id;
    data.username = username;
    return this.service.setPassword(plainToInstance(UserEntity, data));
  }
}
