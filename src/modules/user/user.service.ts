import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsersInCategories(categories: number[]) {
    return this.userRepository.getUsersInCategories(categories);
  }
}
