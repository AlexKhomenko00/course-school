import { Controller, Post, UseGuards } from '@nestjs/common';
import { AccountsRegister, AccountsLogin } from '@microservices/contracts';
import { UserId } from '../decorators/user.decorator';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Post('info')
  async info(@UserId() userId: string) {}
}
