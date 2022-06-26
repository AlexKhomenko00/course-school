import { Body, Controller, Post } from '@nestjs/common';
import { AccountsRegister, AccountsLogin } from '@microservices/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

@Controller('auth')
export class AuthController {
  @Post('register')
  async register(dto: AccountsRegister.Request) {}

  @Post('login')
  async login() {}
}
