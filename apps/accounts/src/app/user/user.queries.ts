import { AccountsUserCourses } from '@microservices/contracts';
import { Body, Controller } from '@nestjs/common';
import { AccountsUserInfo } from 'libs/contracts/src/lib/accounts/accounts.user-info';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserRepository } from './repositories/user.repository';

@Controller()
export class UserQueries {
  constructor(private readonly userRepository: UserRepository) {}

  @RMQValidate()
  @RMQRoute(AccountsUserInfo.topic)
  async userInfo(
    @Body() dto: AccountsUserInfo.Request
  ): Promise<AccountsUserInfo.Response> {
    const user = await this.userRepository.findById(dto.id);
    return { user };
  }

  @RMQValidate()
  @RMQRoute(AccountsUserCourses.topic)
  async coursesInfo(
    @Body() dto: AccountsUserCourses.Request
  ): Promise<AccountsUserCourses.Response> {
    const user = await this.userRepository.findById(dto.id);
    return { courses: user.courses };
  }
}
