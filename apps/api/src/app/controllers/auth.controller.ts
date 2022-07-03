import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AccountsRegister, AccountsLogin } from '@microservices/contracts';
import { RMQRoute, RMQService, RMQValidate } from 'nestjs-rmq';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      return await this.rmqService.send<
        AccountsRegister.Request,
        AccountsRegister.Response
      >(AccountsRegister.topic, dto, {
        headers: { requestId: 'some request id' },
      });
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      return await this.rmqService.send<
        AccountsLogin.Request,
        AccountsLogin.Response
      >(AccountsLogin.topic, dto);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }
}
