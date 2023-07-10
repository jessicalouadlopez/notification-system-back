import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/modules/shared/prisma/prisma.service';

import * as request from 'supertest';
import { Category, Channel, User } from '@prisma/client';
import { createCategory, createChannel } from '../helpers/model-utils';

describe('CategoryController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    prismaService = moduleFixture.get(PrismaService);
    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await prismaService.reset();
  });

  describe('GET /categories', () => {
    let category1, category2: Category;
    let channel1, channel2: Channel;

    beforeEach(async () => {

      category1 = await createCategory('category1');
      category2 = await createCategory('category2');

      channel1 = await createChannel('channel1');
      channel2 = await createChannel('channel2');
    })

    it('<200> should return all users', async () => {
      const res = await request(app.getHttpServer())
        .get('/categories')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toStrictEqual([
        category1,
        category2
      ]);
    });
  })
});
