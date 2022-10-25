import { Controller, Get, Param } from '@nestjs/common'

import { UserService } from './user.service'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users:id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.findOne({ id })
  }
}
