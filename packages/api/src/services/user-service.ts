import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/dtos/models/user-model'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<Array<User>> {
    return await this.userRepository.find()
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    })
    if (!user) {
      throw new NotFoundException(`User ${id} not found`)
    }
    return user
  }
}
