import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { User } from "./user.entity";
import { UsersService } from "./users.service";

describe('AuthService', () =>{
  let authService: AuthService;

  beforeEach(async () => {
    const fakeUserService: Partial<UsersService> = {
      find: async () => Promise.resolve([]),
      create: async (email: string, password: string) => Promise.resolve({ id: 2, email, password } as User)
    }

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService
        }
      ]
    }).compile();
    authService = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(authService).toBeDefined();
  });
})

