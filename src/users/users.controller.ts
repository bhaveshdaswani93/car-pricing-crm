import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  async createUser(@Body() body: CreateUserDto) {
    await this.userService.create(body.email, body.password);
    return 'User Created Successfully.';
  }

  @Get('/users')
  async getAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/user/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Delete('/user/:id')
  async removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/user/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    this.userService.update(parseInt(id), body);
  }
}
