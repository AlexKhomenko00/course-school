import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RMQModule } from 'nestjs-rmq';
import { getJwtConfig } from './configs/jwt.config';
import { getRMQConfig } from './configs/rmq.config';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { JwtAuthStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'envs/.auth.env', isGlobal: true }),
    JwtModule.registerAsync(getJwtConfig()),
    RMQModule.forRootAsync(getRMQConfig()),
    PassportModule,
  ],
  controllers: [AuthController, UserController],
  providers: [JwtAuthStrategy],
})
export class AppModule {}
