import { Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UserId } from '../decorators/user.decorator';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Post('info')
  async info(@UserId() userId: string) {}

  @Cron('*/5 * * * * *')
  async cron() {
    Logger.log('Done');
  }
}
