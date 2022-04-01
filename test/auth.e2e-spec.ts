import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('test signup flow', async () => {
    const emailPass = 'abcd41@a.com';
    const password = 'abcd';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: emailPass,
        password,
      })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(emailPass);
      });
  });

  it('signup a user and get current user info', async () => {
    const email = 'a@b.com';
    const password = 'adfc';
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email,
        password,
      })
      .expect(201);
    const cookie = res.get('Set-Cookie');

    await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200)
      .then((res) => {
        const { email } = res.body;
        expect(email).toEqual(email);
      });
  });
});
