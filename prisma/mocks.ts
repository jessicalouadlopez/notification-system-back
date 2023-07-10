import { PrismaClient } from '@prisma/client';

console.log(`Seeding database ${process.env.DATABASE_URL}`);
const prisma = new PrismaClient();

async function main() {
  console.log("Running mocks-main()");

  const sportsCategory = await prisma.category.create({
    data: {
      name: 'Sports'
    }
  })

  const financeCategory = await prisma.category.create({
    data: {
      name: 'Finance'
    }
  })

  const moviesCategory = await prisma.category.create({
    data: {
      name: 'Movies'
    }
  })

  const smsChannel = await prisma.channel.create({
    data: {
      name: 'SMS'
    }
  })

  const emailChannel = await prisma.channel.create({
    data: {
      name: 'E-Mail'
    }
  })

  const pushChannel = await prisma.channel.create({
    data: {
      name: 'Push Notification'
    }
  })

  await prisma.user.create({
    data: {
      email: 'user1@user1.com',
      name: 'user1',
      phone_number: '+511111111',
      channels: {
        create: [
          {
            channel: {
              connect: {
                id: smsChannel.id
              }
            }
          },
          {
            channel: {
              connect: {
                id: pushChannel.id
              }
            }
          }
        ]
      },
      categories: {
        create: [
          {
            category: {
              connect: {
                id: sportsCategory.id
              }
            }
          },
          {
            category: {
              connect: {
                id: financeCategory.id
              }
            }
          },
          {
            category: {
              connect: {
                id: moviesCategory.id
              }
            }
          }
        ]
      }
    }
  })

  await prisma.user.create({
    data: {
      email: 'user2@user2.com',
      name: 'user2',
      phone_number: '+522222222',
      channels: {
        create: [
          {
            channel: {
              connect: {
                id: smsChannel.id
              }
            }
          },
          {
            channel: {
              connect: {
                id: emailChannel.id
              }
            }
          }
        ]
      }
    }
  })

  await prisma.user.create({
    data: {
      email: 'user3@user3.com',
      name: 'user3',
      phone_number: '+533333333',
      categories: {
        create: [
          {
            category: {
              connect: {
                id: sportsCategory.id
              }
            }
          }
        ]
      }
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(() => {
    console.log("Seeding database finished");
  });
