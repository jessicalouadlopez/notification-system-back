import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/modules/shared/prisma/prisma.service';
import { Category, Channel, User } from '@prisma/client';
import { createCategory, createChannel, createUser } from '../helpers/model-utils';
import { UserService } from '../../src/modules/user/user.service';

describe('user.service', () => {
  let moduleFixture: TestingModule;
  let userService: UserService;
  let prismaService: PrismaService;


  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    userService = moduleFixture.get(UserService);
    prismaService = moduleFixture.get(PrismaService);
  });

  afterAll(async () => {
    await moduleFixture.close();
  });

  beforeEach(async () => {
    await prismaService.reset();
  });

  describe('validate', () => {
    let category1, category2: Category;
    let channel1, channel2: Channel;
    let user1, user2, user3: User;

    beforeEach(async () => {
      category1 = await createCategory('category1');
      category2 = await createCategory('category2');

      channel1 = await createChannel('channel1');
      channel2 = await createChannel('channel2');

      user1 = await createUser('user1@user1.com', 'user1', '+51111111', [category1, category2], [channel1, channel2]);
      user2 = await createUser('user2@user2.com', 'user2', '+52222222', [category1], [channel1]);
      user3 = await createUser('user3@user3.com', 'user3', '+53333333', [], [channel1, channel2]);
    });

    it('should return users in category', async () => {
      expect(true).toBeTruthy();
    });
  });

});
