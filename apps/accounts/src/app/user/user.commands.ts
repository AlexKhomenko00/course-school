import {
  AccountsBuyCourse,
  AccountsChangeProfile,
  AccountsCheckPayment,
} from '@microservices/contracts';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQService, RMQValidate } from 'nestjs-rmq';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './repositories/user.repository';
import { BuyCourseSaga } from './sagas/buy-course.saga';
import { UserService } from './user.service';

@Controller()
export class UserCommands {
  constructor(private readonly userService: UserService) {}

  @RMQValidate()
  @RMQRoute(AccountsChangeProfile.topic)
  async changeProfile(
    @Body() { id, user }: AccountsChangeProfile.Request
  ): Promise<AccountsChangeProfile.Response> {
    return this.userService.changeProfile(user, id);
  }

  @RMQValidate()
  @RMQRoute(AccountsBuyCourse.topic)
  async buyCourse(
    @Body() { userId, courseId }: AccountsBuyCourse.Request
  ): Promise<AccountsBuyCourse.Response> {
    return this.userService.buyCourse(userId, courseId);
  }

  @RMQValidate()
  @RMQRoute(AccountsCheckPayment.topic)
  async checkPayment(
    @Body() { userId, courseId }: AccountsCheckPayment.Request
  ): Promise<AccountsCheckPayment.Response> {
    return this.userService.checkPayment(userId, courseId);
  }
}
