import { Category, Channel } from "@prisma/client";
import { PrismaService } from "../../src/modules/shared/prisma/prisma.service";

const prismaService = new PrismaService();

export const createCategory = async (name: string): Promise<Category> => {
  return await prismaService.category.create({
    data: {
      name
    }
  });
};

export const createChannel = async (name: string): Promise<Channel> => {
  return await prismaService.channel.create({
    data: {
      name
    }
  });
};

export const createUser = async (email: string, name: string, phone_number: string, categories: Category[], channels: Channel[]) => {
  const categoriesCreate = categories.map((category) => {
    return {
      category: {
        connect: {
          id: category.id
        }
      }
    }
  });

  const channelsCreate = channels.map((channel) => {
    return {
      channel: {
        connect: {
          id: channel.id
        }
      }
    }
  });

  return await prismaService.user.create({
    data: {
      email,
      name,
      phone_number,
      categories: {
        create: categoriesCreate
      },
      channels: {
        create: channelsCreate
      }
    }
  });
}
