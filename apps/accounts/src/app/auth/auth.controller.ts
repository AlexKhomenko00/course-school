import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountsRegister, AccountsLogin } from '@microservices/contracts';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(
    dto: AccountsRegister.Request
  ): Promise<AccountsRegister.Response> {
    return this.authService.register(dto);
  }

  @Post('/login')
  async login(
    @Body() { email, password }: AccountsLogin.Request
  ): Promise<AccountsLogin.Response> {
    const { id } = await this.authService.validateUser(email, password);
    return this.authService.login(id);
  }
}
