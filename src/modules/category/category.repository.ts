import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private prismaService: PrismaService) { }

  async getCategories() {
    return this.prismaService.category.findMany({});
  }
}
