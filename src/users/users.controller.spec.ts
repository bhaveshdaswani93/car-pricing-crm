import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<UsersService>;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    usersService = {};

    authService = {
      signup: (email, password) =>
        Promise.resolve({ email, password, id: 1 } as User),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersService,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('signup a user', async () => {
    const email = 'a@a.com';
    const password = 'asdf';
    const session = {};
    const user = await controller.signup({ email, password }, session);
    expect(user).toBeDefined();
    expect(user.email).toEqual(email);
    expect(user.id).toBeDefined();
  });
});
