import { AccountsChangeProfile } from '@microservices/contracts';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './repositories/user.repository';

@Controller()
export class UserCommands {
  constructor(private readonly userRepository: UserRepository) {}

  @RMQValidate()
  @RMQRoute(AccountsChangeProfile.topic)
  async changeProfile(
    @Body() { id, user }: AccountsChangeProfile.Request
  ): Promise<AccountsChangeProfile.Response> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }
    const userEntity = new UserEntity(existingUser).updateProfile(
      user.displayName
    );
    await this.userRepository.updateUser(userEntity);
    return;
  }
}
