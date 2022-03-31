import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let authService: AuthService;
  let fakeUserService: Partial<UsersService>;
  beforeEach(async () => {
    fakeUserService = {
      find: async () => Promise.resolve([]),
      create: async (email: string, password: string) => {
        console.log(password);
        return Promise.resolve({ id: 2, email, password } as User);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();
    authService = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(authService).toBeDefined();
  });

  it('signup a new user', async () => {
    const email = 'a@a.com';
    const password = '123456';
    const user = await authService.signup(email, password);
    expect(user).toBeDefined();
    expect(user.email).toEqual(email);
  });

  it('throws error on email already used while signup', async () => {
    fakeUserService.find = () =>
      Promise.resolve([{ email: 'a@a.com', password: '132', id: 1 }] as User[]);
    const email = 'a@a.com';
    const password = '123456';
    await expect(authService.signup(email, password)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('signin the user', async () => {
    const email = 'a@a.com';
    const password = '123456';
    const user = await authService.signup(email, password);
    fakeUserService.find = () =>
      Promise.resolve([
        { email: user.email, password: user.password, id: 1 },
      ] as User[]);

    const userSignin = await authService.signin(email, password);
    expect(userSignin).toBeDefined();
    expect(userSignin.email).toEqual(email);
  });
});
