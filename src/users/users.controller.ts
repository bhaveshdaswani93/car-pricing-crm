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
  Session,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}

  @Post('/signup')
  async signup(@Body() body: CreateUserDto, @Session() session) {
   const user = await this.authService.signup(body.email, body.password);
   session.userid = user.id;
   return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session) {
    const user = await this.authService.signin(body.email, body.password);
    session.userid = user.id;
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('whoami')
  async whoami(@CurrentUser() user: User, @Request() request) {
    console.log(request.session);
    return user;
  }

  @Post('signout')
  async signout(@Session() session) {
    session.userid = null;
    return "Signed out successfully.";
  }



  @Get('/users')
  async getAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }


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
