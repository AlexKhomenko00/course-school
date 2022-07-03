import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountsRegister, AccountsLogin } from '@microservices/contracts';
import { Message, RMQMessage, RMQRoute, RMQValidate } from 'nestjs-rmq';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @RMQValidate()
  @RMQRoute(AccountsRegister.topic)
  async register(
    dto: AccountsRegister.Request,
    @RMQMessage msg: Message
  ): Promise<AccountsRegister.Response> {
    const rid = msg.properties.headers['requestId'];
    const logger = new Logger(rid);
    logger.log('Some info about registration');
    return this.authService.register(dto);
  }

  @RMQValidate()
  @RMQRoute(AccountsLogin.topic)
  async login({
    email,
    password,
  }: AccountsLogin.Request): Promise<AccountsLogin.Response> {
    const { id } = await this.authService.validateUser(email, password);
    return this.authService.login(id);
  }
}
