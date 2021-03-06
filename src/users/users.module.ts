import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  providers: [UsersService, AuthService, {
    useClass: CurrentUserInterceptor,
    provide: APP_INTERCEPTOR
  }],
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([User])
  ]
})
export class UsersModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}
